import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useState as useFormState } from 'react';

interface Team {
  id: string;
  name: string;
  short_name: string;
  flag: string;
  color: string;
}

export default function TeamsManager() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', short_name: '', flag: '', color: '' });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase.from('teams').select('*').order('name');
      if (error) throw error;
      setTeams(data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('teams')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('teams').insert(formData);
        if (error) throw error;
      }
      setFormData({ name: '', short_name: '', flag: '', color: '' });
      setEditingId(null);
      setIsDialogOpen(false);
      fetchTeams();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (team: Team) => {
    setFormData(team);
    setEditingId(team.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team?')) return;
    try {
      const { error } = await supabase.from('teams').delete().eq('id', id);
      if (error) throw error;
      fetchTeams();
    } catch (err) {
      console.error('Error deleting team:', err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Teams</CardTitle>
          <CardDescription>Manage cricket teams</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', short_name: '', flag: '', color: '' });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Team' : 'Add New Team'}</DialogTitle>
              <DialogDescription>Enter team details below</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Team Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., India"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Short Name</Label>
                <Input
                  value={formData.short_name}
                  onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                  placeholder="e.g., IND"
                  maxLength={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Flag Emoji</Label>
                <Input
                  value={formData.flag}
                  onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                  placeholder="🇮🇳"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Color (Hex)</Label>
                <Input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingId ? 'Update Team' : 'Add Team'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : teams.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No teams found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Short</TableHead>
                <TableHead>Flag</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.short_name}</TableCell>
                  <TableCell>{team.flag}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(team)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(team.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
