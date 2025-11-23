-- Fix foreign key constraint on invites table to allow user deletion
ALTER TABLE invites DROP CONSTRAINT invites_referrer_id_fkey;

ALTER TABLE invites 
  ADD CONSTRAINT invites_referrer_id_fkey 
  FOREIGN KEY (referrer_id) 
  REFERENCES users(id) 
  ON DELETE CASCADE;
