"use client";

import { apiClient } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePermissions } from "@/hooks/use-permissions";
import { KeyRound, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

export default function AdminPermissionsPage() {
  const { permissions, loading } = usePermissions();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    path: "",
    method: "GET",
    module: "",
  });

  const filteredPermissions = permissions.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await apiClient.post("/permissions", formData);
      toast.success("Đã tạo quyền mới thành công.");
      queryClient.invalidateQueries({ queryKey: ["admin-permissions"] });
      setIsFormOpen(false);
      setFormData({ name: "", description: "", path: "", method: "GET", module: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi tạo quyền.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <KeyRound className="h-6 w-6 text-primary" />
            Định nghĩa Quyền hạn
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Quản lý các định nghĩa quyền cơ bản trong toàn hệ thống.
          </p>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger render={
            <Button className="shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Tạo quyền mới
            </Button>
          } />
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm quyền mới</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="perm-name">Mã định danh quyền *</Label>
                  <Input
                    id="perm-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: orders:create"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="perm-module">Module *</Label>
                  <Input
                    id="perm-module"
                    value={formData.module}
                    onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                    placeholder="Ví dụ: orders, users..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="perm-method">Method</Label>
                  <select
                    id="perm-method"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="ALL">ALL</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="perm-path">API Path *</Label>
                <Input
                  id="perm-path"
                  value={formData.path}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                  placeholder="Ví dụ: /api/orders"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="perm-desc">Mô tả</Label>
                <Input
                  id="perm-desc"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ví dụ: Cho phép tạo đơn hàng mới"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Đang xử lý..." : "Tạo ngay"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm bg-white dark:bg-slate-950">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Tất cả Quyền hạn</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm quyền..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableRow>
                <TableHead>Mã định danh</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>API Path</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Mô tả</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </TableCell>
                </TableRow>
              ) : filteredPermissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-400">
                    Không tìm thấy quyền phù hợp.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPermissions.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs font-bold text-primary">
                      {p.name}
                    </TableCell>
                    <TableCell>
                       <Badge variant="secondary">{p.module}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">{p.path}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        p.method === 'GET' ? 'text-green-600 border-green-200' :
                        p.method === 'POST' ? 'text-blue-600 border-blue-200' :
                        p.method === 'DELETE' ? 'text-red-600 border-red-200' :
                        'text-slate-600 border-slate-200'
                      }>
                        {p.method}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">{p.description}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
