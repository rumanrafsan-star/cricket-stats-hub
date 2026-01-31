import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';

interface Poll {
  id: string;
  question: string;
  total_votes: number;
  is_active: boolean;
}

export default function PollsManager() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    options: [{ id: '1', text: '', votes: 0 }, { id: '2', text: '', votes: 0 }],
    is_active: true,
  });

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPolls(data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = {
        question: formData.question,
        options: formData.options.filter(opt => opt.text),
        is_active: formData.is_active,
      };

      if (editingId) {
        const { error } = await supabase
          .from('polls')
          .update(submitData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('polls').insert(submitData);
        if (error) throw error;
      }
      resetForm();
      setIsDialogOpen(false);
      fetchPolls();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      options: [{ id: '1', text: '', votes: 0 }, { id: '2', text: '', votes: 0 }],
      is_active: true,
    });
    setEditingId(null);
  };

  const handleEdit = (poll: Poll) => {
    setFormData({
      question: poll.question,
      options: [{ id: '1', text: '', votes: 0 }, { id: '2', text: '', votes: 0 }],
      is_active: poll.is_active,
    });
    setEditingId(poll.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await supabase.from('polls').delete().eq('id', id);
      fetchPolls();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const addOption = () => {
    const newId = Math.max(...formData.options.map(o => parseInt(o.id)), 0) + 1;
    setFormData({
      ...formData,
      options: [...formData.options, { id: newId.toString(), text: '', votes: 0 }],
    });
  };

  const removeOption = (id: string) => {
    setFormData({
      ...formData,
      options: formData.options.filter(opt => opt.id !== id),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Polls</CardTitle>
          <CardDescription>Manage fan polls</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Poll
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Poll' : 'Add New Poll'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Question</Label>
                <Input
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g., Who will win the match?"
                  required
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addOption}>
                    Add Option
                  </Button>
                </div>
                {formData.options.map((option, idx) => (
                  <div key={option.id} className="flex gap-2">
                    <Input
                      value={option.text}
                      onChange={(e) => {
                        const newOptions = [...formData.options];
                        newOptions[idx].text = e.target.value;
                        setFormData({ ...formData, options: newOptions });
                      }}
                      placeholder={`Option ${idx + 1}`}
                    />
                    {formData.options.length > 2 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeOption(option.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <Label htmlFor="active" className="cursor-pointer">Active Poll</Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingId ? 'Update' : 'Create'} Poll
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
        ) : polls.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No polls found</p>
        ) : (
          <div className="space-y-4">
            {polls.map((poll) => (
              <Card key={poll.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{poll.question}</h3>
                    <div className="flex gap-2 mt-2 text-sm">
                      <span className="text-muted-foreground">{poll.total_votes} votes</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        poll.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {poll.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="space-x-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(poll)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(poll.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
