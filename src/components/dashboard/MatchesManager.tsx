import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';

interface Match {
  id: string;
  team1_id: string;
  team2_id: string;
  status: string;
  format: string;
  tournament: string;
  venue: string;
  match_date: string;
}

export default function MatchesManager() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    team1_id: '',
    team2_id: '',
    status: 'upcoming',
    format: 'T20',
    tournament: '',
    venue: '',
    match_date: '',
  });

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('id, team1_id, team2_id, status, format, tournament, venue, match_date')
        .order('match_date', { ascending: false });
      if (error) throw error;
      setMatches(data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('matches').update(formData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('matches').insert(formData);
        if (error) throw error;
      }
      resetForm();
      setIsDialogOpen(false);
      fetchMatches();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ team1_id: '', team2_id: '', status: 'upcoming', format: 'T20', tournament: '', venue: '', match_date: '' });
    setEditingId(null);
  };

  const handleEdit = (match: Match) => {
    setFormData(match);
    setEditingId(match.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await supabase.from('matches').delete().eq('id', id);
      fetchMatches();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Matches</CardTitle>
          <CardDescription>Manage cricket matches</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Match
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Match' : 'Add New Match'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Team 1</Label>
                  <Input value={formData.team1_id} onChange={(e) => setFormData({ ...formData, team1_id: e.target.value })} placeholder="UUID" required />
                </div>
                <div className="space-y-2">
                  <Label>Team 2</Label>
                  <Input value={formData.team2_id} onChange={(e) => setFormData({ ...formData, team2_id: e.target.value })} placeholder="UUID" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select value={formData.format} onValueChange={(value) => setFormData({ ...formData, format: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="T20">T20</SelectItem>
                      <SelectItem value="ODI">ODI</SelectItem>
                      <SelectItem value="Test">Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tournament</Label>
                <Input value={formData.tournament} onChange={(e) => setFormData({ ...formData, tournament: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Venue</Label>
                <Input value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Match Date</Label>
                <Input type="date" value={formData.match_date} onChange={(e) => setFormData({ ...formData, match_date: e.target.value })} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingId ? 'Update' : 'Add'} Match
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
        ) : matches.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No matches found</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tournament</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell>{match.tournament}</TableCell>
                    <TableCell>{match.format}</TableCell>
                    <TableCell>{match.venue}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        match.status === 'live' ? 'bg-red-100 text-red-800' :
                        match.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {match.status}
                      </span>
                    </TableCell>
                    <TableCell>{match.match_date}</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(match)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(match.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
