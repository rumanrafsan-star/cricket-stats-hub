import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
}

export default function NewsManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'General',
    author: '',
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('id, title, excerpt, category, author')
        .order('published_at', { ascending: false });
      if (error) throw error;
      setArticles(data || []);
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
          .from('news_articles')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news_articles').insert(formData);
        if (error) throw error;
      }
      resetForm();
      setIsDialogOpen(false);
      fetchArticles();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', category: 'General', author: '' });
    setEditingId(null);
  };

  const handleEdit = (article: Article) => {
    setFormData(article);
    setEditingId(article.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await supabase.from('news_articles').delete().eq('id', id);
      fetchArticles();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>News Articles</CardTitle>
          <CardDescription>Manage cricket news</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Article' : 'Add New Article'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={3} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingId ? 'Update' : 'Add'} Article
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
        ) : articles.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No articles found</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                    <div className="flex gap-2 mt-2 text-xs">
                      <span className="bg-muted px-2 py-1 rounded">{article.category}</span>
                      <span className="text-muted-foreground">By {article.author}</span>
                    </div>
                  </div>
                  <div className="space-x-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>
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
