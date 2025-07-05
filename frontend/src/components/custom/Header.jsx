import React, { useEffect, useState } from 'react';
import { Button } from "../ui/button";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from 'axios';

function Header() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (err) => console.log("Login Failed:", err),
  });

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        },
        params: {
          access_token: tokenInfo?.access_token,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        setOpenDialog(false);
        window.location.reload(); // Optional: Refresh to reflect login state
      })
      .catch((err) => {
        console.error('Error fetching user profile:', err);
      });
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="./logo.svg" alt="Logo" className="cursor-pointer" onClick={() => navigate('/')} />

      <div>
        {user ? (
          <div className='flex items-center gap-5'>
            <Button variant="outline" className="rounded-full" onClick={() => navigate('/my-trips')}>
              My Trips
            </Button>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="User"
                  className='h-[35px] w-[35px] rounded-full'
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  onClick={handleLogout}
                  className='cursor-pointer text-red-600 hover:underline'
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign in to continue</DialogTitle>
                  <DialogDescription>
                    Please sign in using your Google account to access your trips.
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={login}
                >
                  Sign in with Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
