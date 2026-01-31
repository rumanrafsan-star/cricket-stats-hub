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

interface Player {
  id: string;
  name: string;
  role: string;
  team: string;
  matches: number;
  runs: number;
  wickets: number;
}

export default function PlayersManager() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Batsman',
    team: '',
    matches: 0,
    runs: 0,
    wickets: 0,
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const { data, error } = await supabase.from('players').select('*').order('name');
      if (error) throw error;
      setPlayers(data || []);
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
          .from('players')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('players').insert(formData);
        if (error) throw error;
      }
      setFormData({ name: '', role: 'Batsman', team: '', matches: 0, runs: 0, wickets: 0 });
      setEditingId(null);
      setIsDialogOpen(false);
      fetchPlayers();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (player: Player) => {
    setFormData(player);
    setEditingId(player.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await supabase.from('players').delete().eq('id', id);
      fetchPlayers();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Players</CardTitle>
          <CardDescription>Manage cricket players</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingId(null); setFormData({ name: '', role: 'Batsman', team: '', matches: 0, runs: 0, wickets: 0 }); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Player
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Player' : 'Add New Player'}</DialogTitle>
              <DialogDescription>Enter player details</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Batsman">Batsman</SelectItem>
                    <SelectItem value="Bowler">Bowler</SelectItem>
                    <SelectItem value="All-Rounder">All-Rounder</SelectItem>
                    <SelectItem value="Wicket-Keeper">Wicket-Keeper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Team</Label>
                <Input value={formData.team} onChange={(e) => setFormData({ ...formData, team: e.target.value })} placeholder="e.g., IND" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Matches</Label>
                  <Input type="number" value={formData.matches} onChange={(e) => setFormData({ ...formData, matches: parseInt(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Runs</Label>
                  <Input type="number" value={formData.runs} onChange={(e) => setFormData({ ...formData, runs: parseInt(e.target.value) })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Wickets</Label>
                <Input type="number" value={formData.wickets} onChange={(e) => setFormData({ ...formData, wickets: parseInt(e.target.value) })} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingId ? 'Update' : 'Add'} Player
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
        ) : players.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No players found</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Runs</TableHead>
                  <TableHead>Wickets</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.role}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell>{player.runs}</TableCell>
                    <TableCell>{player.wickets}</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(player)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(player.id)}>
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
