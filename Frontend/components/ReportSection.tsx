// Frontend/components/ReportSection.tsx

"use client";

import { useEffect, useState } from "react";
import { useAuthProvider } from "@/context/AuthContext";
import { getReportApi } from "@/lib/api";
import Link from "next/link";
import { ApiTodoReport } from "@/types/Todo";
import { useRouter } from "next/navigation";

const ReportSection = () => {
  const router = useRouter();
  const { is_login } = useAuthProvider();
  const [report, setReport] = useState<ApiTodoReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!is_login) return;

    getReportApi()
      .then(setReport)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [is_login]);

  if (!is_login) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Silakan Login Terlebih Dahulu
        </h2>
        <p className="text-gray-600 mb-4">
          Anda harus login untuk melihat laporan aktivitas todo Anda.
        </p>
        <Link
          href="/auth/login"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login Sekarang
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat laporan aktivitas...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <p className="text-red-600 font-medium">Gagal memuat laporan.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium opacity-80">
              Total Todo Minggu Ini
            </h3>
            <p className="text-3xl font-bold mt-2">
              {report.daily.reduce((sum, day) => sum + (day.total ?? 0), 0)}
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium opacity-80">
              Selesai Minggu Ini
            </h3>
            <p className="text-3xl font-bold mt-2">
              {report.daily.reduce((sum, day) => Number(day.completed ?? 0), 0)}
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium opacity-80">
              Persentase Selesai
            </h3>
            <p className="text-3xl font-bold mt-2">
              {report.daily.length > 0
                ? (() => {
                    const total = report.daily.reduce(
                      (sum, day) => sum + (day.total ?? 0),
                      0,
                    );
                    const completed = report.daily.reduce(
                      (sum, day) => sum + (day.completed ?? 0),
                      0,
                    );
                    return total > 0
                      ? Math.round((completed / total) * 100)
                      : 0;
                  })()
                : 0}
              %
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-blue-600">📊</span>
              Aktivitas 7 Hari Terakhir
            </h2>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Kembali</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4 text-gray-600 font-semibold">
                  Tanggal
                </th>
                <th className="text-center p-4 text-gray-600 font-semibold">
                  Total Todo
                </th>
                <th className="text-center p-4 text-gray-600 font-semibold">
                  Selesai
                </th>
                <th className="text-center p-4 text-gray-600 font-semibold">
                  Pending
                </th>
                <th className="text-center p-4 text-gray-600 font-semibold">
                  Persentase
                </th>
              </tr>
            </thead>
            <tbody>
              {report.daily.length > 0 ? (
                report.daily.map((day) => {
                  const total = day.total ?? 0;
                  const completed = day.completed ?? 0;
                  const pending = total - completed;
                  const percentage =
                    total > 0 ? Math.round((completed / total) * 100) : 0;

                  return (
                    <tr
                      key={day.date}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-medium">
                        {new Date(day.date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 text-center font-semibold text-gray-800">
                        {total}
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {completed}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {pending}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="font-semibold text-sm">
                            {percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-gray-500">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-2">📝</span>
                      <p>Belum ada aktivitas todo dalam 7 hari terakhir</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span className="text-orange-600">📅</span>
          Aktivitas 12 Minggu Terakhir
        </h2>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {report.weekly.length > 0 ? (
            report.weekly.map((week) => {
              const total = week.total ?? 0;
              const completed = week.completed ?? 0;
              const percentage =
                total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div
                  key={week.week}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {week.label ?? "Minggu Tidak Dikenal"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Minggu {Math.floor(week.week ?? 0) % 100},{" "}
                      {Math.floor(week.week ?? 0) / 100}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        Selesai / Total
                      </div>
                      <div className="font-semibold">
                        <span className="text-green-600">{completed}</span> /
                        <span className="text-gray-800"> {total}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Persentase</div>
                      <div className="font-bold text-lg text-blue-600">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-8 text-gray-500">
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">🗓️</span>
                <p>Belum ada aktivitas todo dalam 12 minggu terakhir</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span className="text-red-600">🗓️</span>
          Aktivitas Per Tahun
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {report.yearly.length > 0 ? (
            report.yearly.map((year) => {
              const total = year.total ?? 0;
              const completed = year.completed ?? 0;
              const pending = total - completed;
              const percentage =
                total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div
                  key={year.year}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {year.year}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-semibold">{total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Selesai:</span>
                        <span className="font-semibold">{completed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-600">Pending:</span>
                        <span className="font-semibold">{pending}</span>
                      </div>
                      <div className="pt-2">
                        <div className="text-sm text-gray-600 mb-1">
                          Persentase Selesai
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-center mt-1 font-semibold text-sm text-blue-600">
                          {percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center p-8 text-gray-500">
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">📅</span>
                <p>Belum ada aktivitas todo dalam 5 tahun terakhir</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReportSection;
