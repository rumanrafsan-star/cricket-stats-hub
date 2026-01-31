import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function ProfileSettings() {
  const { session, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // Profile update logic here
      console.log('Updating profile:', { fullName, bio });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={session?.user?.email || ''}
              disabled
              className="bg-slate-100"
            />
            <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">Account Security</CardTitle>
          <CardDescription className="text-red-600">Sign out or manage your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleSignOut}
            disabled={loading}
            variant="destructive"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing out...
              </>
            ) : (
              'Sign Out'
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            You can sign back in at any time with your email and password
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
