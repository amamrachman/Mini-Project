<?php

namespace App\Services;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class TodoReportService
{
    public function getDailyReport(int $userId, int $days = 7)
    {
        return DB::table('todos')
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total, SUM(is_completed) as completed')
            ->where('user_id', $userId)
            ->where('created_at', '>=', now()->subDays($days))
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }

    public function getWeeklyReport(int $userId, int $weeks = 12)
    {
        $data = DB::table('todos')
            ->selectRaw('YEARWEEK(created_at) as week, COUNT(*) as total, SUM(is_completed) as completed')
            ->where('user_id', $userId)
            ->where('created_at', '>=', now()->subWeek($weeks))
            ->groupBy('week')
            ->orderBy('week')
            ->get();

        return $data->map(function ($item) {
            $year = floor($item->week / 100);
            $week = $item->week % 100;
            $date = Carbon::now()->year($year)->week($week)->startOfWeek();
            $item->label = 'Minggu ' . $date->format('W, M Y');
            return $item;
        });
    }

    public function getYearlyReport(int $userId, int $years = 5)
    {
        return DB::table('todos')
            ->selectRaw('YEAR(created_at) as year, COUNT(*) as total, SUM(is_completed) as completed')
            ->where('user_id', $userId)
            ->where('created_at', '>=', now()->subYears($years))
            ->groupBy('year')
            ->orderBy('year')
            ->get();
    }

    public function generateFullReport(int $userId): array
    {
        return [
            'daily' => $this->getDailyReport($userId),
            'weekly' => $this->getWeeklyReport($userId),
            'yearly' => $this->getYearlyReport($userId),
        ];
    }
}