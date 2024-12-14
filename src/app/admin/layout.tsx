// app/admin/layout.tsx
import RequireAdmin from '@/components/admin/require-admin'
import { AdminSidebar } from '@/components/admin/shared/admin-header'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAdmin>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </RequireAdmin>
  )
}