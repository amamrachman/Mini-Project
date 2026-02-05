<?php

namespace App\Http\Controllers\API;

use App\Models\Todo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\TodoReportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class TodoController extends Controller
{
    public function __construct(
        protected TodoReportService $todoReport
    ) {}
    
    public function index (Request $request): JsonResponse
    {
        $todos = Todo::query()
            ->select(['id', 'judul', 'is_completed', 'created_at'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $todos,
        ]);
    }

    public function store (Request $request): JsonResponse
    {
        $validated = $request->validate([
            'judul' => ['required', 'string'],
        ]);

        $todo = Todo::create([
            'user_id' => $request->user()->id,
            'judul' => $validated['judul'],
            'is_completed' => false,
        ]);

        return response()->json([
            'message' => 'Todo Berhasil Dibuat',
            'data' => $todo
        ], 201);
    }

    public function sync (Request $request)
    {
        $validated = $request->validate([
            'todos' => ['required', 'array'],
            'todos.*.judul' => ['required', 'string'],
            'todos.*.complete' => ['required', 'boolean'],
        ]);

        $userId = $request->user()->id;

        $payload = collect($validated['todos'])->map(function ($todo) use ($userId) {
            return [
                'user_id' => $userId,
                'judul' => $todo['judul'],
                'is_completed' => $todo['complete'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        Todo::insert($payload);

        return response()->json([
            'message' => 'Todo Berhasil Di Sinkronkan',
        ]);
    }

    public function update (Request $request, int $id): JsonResponse
    {
        Log::info($request);
        $validated = $request->validate([
            'judul' => ['sometimes', 'string'],
            'complete' => ['sometimes', 'boolean'],
        ]);

        $todo = Todo::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();
        
        if (isset($validated['complete'])) {
            $validated['is_completed'] = $validated['complete'];
            unset($validated['complete']);
        }

        $todo->update($validated);

        return response()->json([
            'message' => 'Todo Berhasil Di Update',
            'data' => $todo,
        ]);
    }

    public function destroy (Request $request, int $id): JsonResponse
    {
        $todo = Todo::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $todo->delete();

        return response()->json([
            'message' => 'Todo Berhasil Di Hapus',
        ]);
    }

    public function report(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $report = $this->todoReport->generateFullReport($userId);
        return response()->json($report);
    }
}
