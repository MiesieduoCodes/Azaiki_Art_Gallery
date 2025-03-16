"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react"

export default function SupabaseTutorial() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    setup: true,
    auth: false,
    database: false,
    storage: false,
    deployment: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Supabase Integration Tutorial</h1>
        <p className="text-gray-600">
          Learn how to use Supabase with your ArtVista gallery website. This guide covers authentication, database, storage, and deployment.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div 
          className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('setup')}
        >
          <h2 className="text-lg font-medium text-gray-900">1. Setting Up Supabase</h2>
          {openSections['setup'] ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
        
        {openSections['setup'] && (
          <div className="p-6">
            <div className="prose max-w-none">
              <h3>Create a Supabase Project</h3>
              <ol>
                <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Supabase.com</a> and sign up or log in.</li>
                <li>Click "New Project" and fill in the details:
                  <ul>
                    <li>Name: ArtVista (or your preferred name)</li>
                    <li>Database Password: Create a strong password</li>
                    <li>Region: Choose the region closest to your users</li>
                    <li>Pricing Plan: Free tier is sufficient for starting</li>
                  </ul>
                </li>
                <li>Click "Create new project" and wait for it to be created (this may take a few minutes).</li>
              </ol>

              <h3>Get Your API Keys</h3>
              <ol>
                <li>Once your project is created, go to the project dashboard.</li>
                <li>In the left sidebar, click on "Project Settings" (the gear icon).</li>
                <li>Click on "API" in the settings menu.</li>
                <li>You'll find two important keys:
                  <ul>
                    <li><strong>URL:</strong> Your Supabase project URL</li>
                    <li><strong>anon/public:</strong> Your public API key</li>
                    <li><strong>service_role:</strong> Your service role key (keep this secret!)</li>
                  </ul>
                </li>
              </ol>

              <h3>Set Up Environment Variables</h3>
              <ol>
                <li>In your Next.js project, create a <code>.env.local</code> file in the root directory.</li>
                <li>Add the following environment variables:
                  <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                    <code>
                      NEXT_PUBLIC_SUPABASE_URL=your_supabase_url<br/>
                      NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key<br/>
                      SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
                    </code>
                  </pre>
                </li>
                <li>For production deployment on Vercel, add these same environment variables in your Vercel project settings.</li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Important:</strong> Never commit your <code>.env.local</code> file to version control. Make sure it's included in your <code>.gitignore</code> file.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div 
          className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('auth')}
        >
          <h2 className="text-lg font-medium text-gray-900">2. Authentication Setup</h2>
          {openSections['auth'] ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
        
        {openSections['auth'] && (
          <div className="p-6">
            <div className="prose max-w-none">
              <h3>Configure Authentication in Supabase</h3>
              <ol>
                <li>In your Supabase dashboard, go to "Authentication" in the left sidebar.</li>
                <li>Under "Providers", ensure "Email" is enabled.</li>
                <li>Optionally, you can enable other providers like Google, Facebook, etc.</li>
                <li>Go to "URL Configuration" and set your site URL and redirect URLs:
                  <ul>
                    <li>Site URL: <code>https://your-website-url.com</code></li>
                    <li>Redirect URLs: 
                      <ul>
                        <li><code>https://your-website-url.com/auth/callback</code></li>
                        <li><code>http://localhost:3000/auth/callback</code> (for local development)</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ol>

              <h3>Create a Profiles Table</h3>
              <ol>
                <li>Go to the "SQL Editor" in your Supabase dashboard.</li>
                <li>Create a new query and paste the following SQL:
                  <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                    <code>
                      CREATE TABLE profiles (<br/>
                      &nbsp;&nbsp;id UUID REFERENCES auth.users(id) PRIMARY KEY,<br/>
                      &nbsp;&nbsp;full_name TEXT,<br/>
                      &nbsp;&nbsp;avatar_url TEXT,<br/>
                      &nbsp;&nbsp;website TEXT,<br/>
                      &nbsp;&nbsp;bio TEXT,<br/>
                      &nbsp;&nbsp;role TEXT DEFAULT 'user',<br/>
                      &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,<br/>
                      &nbsp;&nbsp;updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL<br/>
                      );<br/><br/>

                      -- Set up Row Level Security (RLS)<br/>
                      ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;<br/><br/>

                      -- Create policies<br/>
                      -- Allow users to view all profiles<br/>
                      CREATE POLICY "Profiles are viewable by everyone" ON profiles<br/>
                      &nbsp;&nbsp;FOR SELECT USING (true);<br/><br/>

                      -- Allow users to update their own profile<br/>
                      CREATE POLICY "Users can update their own profile" ON profiles<br/>
                      &nbsp;&nbsp;FOR UPDATE USING (auth.uid() = id);<br/><br/>

                      -- Create a trigger to create a profile when a user signs up<br/>
                      CREATE OR REPLACE FUNCTION public.handle_new_user()<br/>
                      RETURNS TRIGGER AS $$<br/>
                      BEGIN<br/>
                      &nbsp;&nbsp;INSERT INTO public.profiles (id, full_name, avatar_url)<br/>
                      &nbsp;&nbsp;VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');<br/>
                      &nbsp;&nbsp;RETURN NEW;<br/>
                      END;<br/>
                      $ LANGUAGE plpgsql SECURITY DEFINER;<br/><br/>

                      CREATE TRIGGER on_auth_user_created<br/>
                      &nbsp;&nbsp;AFTER INSERT ON auth.users<br/>
                      &nbsp;&nbsp;FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
                    </code>
                  </pre>
                </li>
                <li>Click "Run" to execute the SQL and create the profiles table.</li>
              </ol>

              <h3>Implement Authentication in Your App</h3>
              <p>The authentication context we've already created handles:</p>
              <ul>
                <li>User sign-up and sign-in</li>
                <li>Session management</li>
                <li>Password reset</li>
                <li>Admin role checking</li>
              </ul>
              
              <p>To make a user an admin:</p>
              <ol>
                <li>Go to the "Table Editor" in your Supabase dashboard.</li>
                <li>Select the "profiles" table.</li>
                <li>Find the user you want to make an admin.</li>
                <li>Edit their record and change the "role" field to "admin".</li>
                <li>Click "Save".</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div 
          className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('database')}
        >
          <h2 className="text-lg font-medium text-gray-900">3. Database Setup</h2>
          {openSections['database'] ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
        
        {openSections['database'] && (
          <div className="p-6">
            <div className="prose max-w-none">
              <h3>Create Database Tables</h3>
              <p>Let's create the necessary tables for our art gallery website. Go to the "SQL Editor" in your Supabase dashboard and run the following SQL:</p>
              
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>
                  -- Create artists table<br/>
                  CREATE TABLE artists (<br/>
                  &nbsp;&nbsp;id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,<br/>
                  &nbsp;&nbsp;name TEXT NOT NULL,<br/>
                  &nbsp;&nbsp;specialty TEXT,<br/>
                  &nbsp;&nbsp;country TEXT,<br/>
                  &nbsp;&nbsp;bio TEXT,<br/>
                  &nbsp;&nbsp;image_url TEXT,<br/>
                  &nbsp;&nbsp;featured BOOLEAN DEFAULT false,<br/>
                  &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL<br/>
                  );<br/><br/>

                  -- Create collections table<br/>
                  CREATE TABLE collections (<br/>
                  &nbsp;&nbsp;id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,<br/>
                  &nbsp;&nbsp;name TEXT NOT NULL,<br/>
                  &nbsp;&nbsp;description TEXT,<br/>
                  &nbsp;&nbsp;image_url TEXT,<br/>
                  &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL<br/>
                  );<br/><br/>

                  -- Create artworks table<br/>
                  CREATE TABLE artworks (<br/>
                  &nbsp;&nbsp;id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,<br/>
                  &nbsp;&nbsp;title TEXT NOT NULL,<br/>
                  &nbsp;&nbsp;artist_id BIGINT REFERENCES artists(id),<br/>
                  &nbsp;&nbsp;collection_id BIGINT REFERENCES collections(id),<br/>
                  &nbsp;&nbsp;year TEXT,<br/>
                  &nbsp;&nbsp;medium TEXT,<br/>
                  &nbsp;&nbsp;dimensions TEXT,<br/>
                  &nbsp;&nbsp;description TEXT,<br/>
                  &nbsp;&nbsp;image_url TEXT,<br/>
                  &nbsp;&nbsp;featured BOOLEAN DEFAULT false,<br/>
                  &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL<br/>
                  );<br/><br/>

                  -- Create events table<br/>
                  CREATE TABLE events (<br/>
                  &nbsp;&nbsp;id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,<br/>
                  &nbsp;&nbsp;title TEXT NOT NULL,<br/>
                  &nbsp;&nbsp;description TEXT,<br/>
                  &nbsp;&nbsp;start_date TIMESTAMP WITH TIME ZONE NOT NULL,<br/>
                  &nbsp;&nbsp;end_date TIMESTAMP WITH TIME ZONE NOT NULL,<br/>
                  &nbsp;&nbsp;location TEXT,<br/>
                  &nbsp;&nbsp;image_url TEXT,<br/>
                  &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL<br/>
                  );<br/><br/>

                  -- Create favorites table<br/>
                  CREATE TABLE favorites (<br/>
                  &nbsp;&nbsp;id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,<br/>
                  &nbsp;&nbsp;user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,<br/>
                  &nbsp;&nbsp;artwork_id BIGINT REFERENCES artworks(id) ON DELETE CASCADE,<br/>
                  &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,<br/>
                  &nbsp;&nbsp;UNIQUE(user_id, artwork_id)<br/>
                  );<br/><br/>

                  -- Create visit history table<br/>
                  CREATE TABLE visit_history (<br/>
                  &nbsp;&nbsp;id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,<br/>
                  &nbsp;&nbsp;user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,<br/>
                  &nbsp;&nbsp;artwork_id BIGINT REFERENCES artworks(id) ON DELETE CASCADE,<br/>
                  &nbsp;&nbsp;visited_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL<br/>
                  );<br/><br/>

                  -- Enable Row Level Security (RLS) on all tables<br/>
                  ALTER TABLE artists ENABLE ROW LEVEL SECURITY;<br/>
                  ALTER TABLE collections ENABLE ROW LEVEL SECURITY;<br/>
                  ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;<br/>
                  ALTER TABLE events ENABLE ROW LEVEL SECURITY;<br/>
                  ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;<br/>
                  ALTER TABLE visit_history ENABLE ROW LEVEL SECURITY;<br/><br/>

                  -- Create policies for artists table<br/>
                  CREATE POLICY "Artists are viewable by everyone" ON artists<br/>
                  &nbsp;&nbsp;FOR SELECT USING (true);<br/><br/>

                  CREATE POLICY "Artists are insertable by admins" ON artists<br/>
                  &nbsp;&nbsp;FOR INSERT WITH CHECK (<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;EXISTS (<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SELECT 1 FROM profiles<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHERE profiles.id = auth.uid() AND profiles.role = 'admin'<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;)<br/>
                  &nbsp;&nbsp;);<br/><br/>

                  CREATE POLICY "Artists are updatable by admins" ON artists<br/>
                  &nbsp;&nbsp;FOR UPDATE USING (<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;EXISTS (<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SELECT 1 FROM profiles<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHERE profiles.id = auth.uid() AND profiles.role = 'admin'<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;)<br/>
                  &nbsp;&nbsp;);<br/><br/>

                  CREATE POLICY "Artists are deletable by admins" ON artists<br/>
                  &nbsp;&nbsp;FOR DELETE USING (<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;EXISTS (<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SELECT 1 FROM profiles<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHERE profiles.id = auth.uid() AND profiles.role = 'admin'<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;)<br/>
                  &nbsp;&nbsp;);<br/><br/>

                  -- Similar policies for collections, artworks, and events tables<br/>
                  -- (Repeat the pattern above for each table)<br/><br/>

                  -- Create policies for favorites table<br/>
                  CREATE POLICY "Favorites are viewable by owner" ON favorites<br/>
                  &nbsp;&nbsp;FOR SELECT USING (auth.uid() = user_id);<br/><br/>

                  CREATE POLICY "Favorites are insertable by owner" ON favorites<br/>
                  &nbsp;&nbsp;FOR INSERT WITH CHECK (auth.uid() = user_id);<br/><br/>

                  CREATE POLICY "Favorites are deletable by owner" ON favorites<br/>
                  &nbsp;&nbsp;FOR DELETE USING (auth.uid() = user_id);<br/><br/>

                  -- Create policies for visit_history table<br/>
                  CREATE POLICY "Visit history is viewable by owner" ON visit_history<br/>
                  &nbsp;&nbsp;FOR SELECT USING (auth.uid() = user_id);<br/><br/>

                  CREATE POLICY "Visit history is insertable by owner" ON visit_history<br/>
                  &nbsp;&nbsp;FOR INSERT WITH CHECK (auth.uid() = user_id);<br/>
                </code>
              </pre>

              <h3>Set Up Database Indexes</h3>
              <p>To improve query performance, let's add some indexes:</p>
              
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>
                  -- Add indexes for foreign keys<br/>
                  CREATE INDEX idx_artworks_artist_id ON artworks(artist_id);<br/>
                  CREATE INDEX idx_artworks_collection_id ON artworks(collection_id);<br/>
                  CREATE INDEX idx_favorites_user_id ON favorites(user_id);<br/>
                  CREATE INDEX idx_favorites_artwork_id ON favorites(artwork_id);<br/>
                  CREATE INDEX idx_visit_history_user_id ON visit_history(user_id);<br/>
                  CREATE INDEX idx_visit_history_artwork_id ON visit_history(artwork_id);<br/><br/>

                  -- Add indexes for frequently queried columns<br/>
                  CREATE INDEX idx_artists_featured ON artists(featured);<br/>
                  CREATE INDEX idx_artworks_featured ON artworks(featured);<br/>
                  CREATE INDEX idx_events_start_date ON events(start_date);<br/>
                </code>
              </pre>

              <h3>Working with the Database in Your App</h3>
              <p>We've already set up the Supabase client in <code>lib/supabase.ts</code>. Here are some examples of how to use it:</p>
              
              <h4>Fetching Data</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>
                  // Fetch all artworks<br/>
                  const { data, error } = await supabase<br/>
                  &nbsp;&nbsp;.from('artworks')<br/>
                  &nbsp;&nbsp;.select('*')<br/>
                  &nbsp;&nbsp;.order('created_at', { ascending: false });<br/><br/>

                  // Fetch artwork with related data<br/>
                  const { data, error } = await supabase<br/>
                  &nbsp;&nbsp;.from('artworks')<br/>
                  &nbsp;&nbsp;.select(`<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;*,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;artists:artist_id (id, name),<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;collections:collection_id (id, name)<br/>
                  &nbsp;&nbsp;`)<br/>
                  &nbsp;&nbsp;.eq('id', artworkId)<br/>
                  &nbsp;&nbsp;.single();<br/>
                </code>
              </pre>

              <h4>Creating Data</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>
                  // Insert a new artwork<br/>
                  const { data, error } = await supabase<br/>
                  &nbsp;&nbsp;.from('artworks')<br/>
                  &nbsp;&nbsp;.insert([{<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;title: 'New Artwork',<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;artist_id: 1,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;collection_id: 2,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;year: '2023',<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;medium: 'Oil on canvas',<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;description: 'A beautiful new artwork'<br/>
                  &nbsp;&nbsp;}]);<br/>
                </code>
              </pre>

              <h4>Updating Data</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>
                  // Update an artwork<br/>
                  const { data, error } = await supabase<br/>
                  &nbsp;&nbsp;.from('artworks')<br/>
                  &nbsp;&nbsp;.update({<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;title: 'Updated Title',<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;description: 'Updated description'<br/>
                  &nbsp;&nbsp;})<br/>
                  &nbsp;&nbsp;.eq('id', artworkId);<br/>
                </code>
              </pre>

              <h4>Deleting Data</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>
                  // Delete an artwork<br/>
                  const { error } = await supabase<br/>
                  &nbsp;&nbsp;.from('artworks')<br/>
                  &nbsp;&nbsp;.delete()<br/>
                  &nbsp;&nbsp;.eq('id', artworkId);<br/>
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div 
          className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('storage')}
        >
          <h2 className="text-lg font-medium text-gray-900">4. Storage Setup</h2>
          {openSections['storage'] ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
        
        {openSections['storage'] && (
          <div className="p-6">
            <div className="prose max-w-none">
              <h3>Create Storage Buckets</h3>
              <ol>
                <li>In your Supabase dashboard, go to "Storage" in the left sidebar.</li>
                <li>Click "Create a new bucket".</li>
                <li>Name it "images" and select "Public" for the bucket type.</li>
                <li>Click "Create bucket".</li>
              </ol>

              <h3>Set Up Storage Permissions</h3>
              <ol>
                <li>Click on the "images" bucket you just created.</li>
                <li>Go to the "Policies" tab.</li>
                <li>Add the following policies:
                  <ul>
                    <li><strong>For SELECT (download/view):</strong> Allow public access
                      <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                        <code>true</code>
                      </pre>
                    </li>
                    <li><strong>For INSERT (upload):</strong> Allow authenticated users
                      <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                        <code>(auth.role() = 'authenticated')</code>
                      </pre>
                    </li>
                    <li><strong>For UPDATE:</strong> Allow admins only
                      <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                        <code>
                          EXISTS (<br/>
                          &nbsp;&nbsp;SELECT 1 FROM profiles<br/>
                          &nbsp;&nbsp;WHERE profiles.id = auth.uid() AND profiles.role = 'admin'<br/>
                          )
                        </code>
                      </pre>
                    </li>
                    <li><strong>For DELETE:</strong> Allow admins only
                      <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                        <code>
                          EXISTS (<br/>
                          &nbsp;&nbsp;SELECT 1 FROM profiles<br/>
                          &nbsp;&nbsp;WHERE profiles.id = auth.uid() AND profiles.role = 'admin'<br/>
                          )
                        </code>
                      </pre>
                    </li>
                  </ul>
                </li>
              </ol>

              <h3>Using Storage in Your App</h3>
              <p>Here's how to upload and retrieve files using Supabase Storage:</p>
              
              <h4>Uploading Files</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>
                  // Upload a file<br/>
                  const uploadImage = async (file) => {<br/>
                  &nbsp;&nbsp;const fileExt = file.name.split('.').pop();<br/>
                  &nbsp;&nbsp;const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;<br/>
                  &nbsp;&nbsp;const filePath = `artworks/${fileName}`;<br/>
                  <br/>
                  &nbsp;&nbsp;const { error } = await supabase.storage<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;.from('images')<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;.upload(filePath, file);<br/>
                  <br/>
                  &nbsp;&nbsp;if (error) {<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;throw error;<br/>
                  &nbsp;&nbsp;}<br/>
                  <br/>
                  &nbsp;&nbsp;// Get the public URL<br/>
                  &nbsp;&nbsp;const { data } = supabase.storage.from('images').getPublicUrl(filePath);<br/>
                  &nbsp;&nbsp;return data.publicUrl;<br/>
                  };<br/>
                </code>
              </pre>

              <h4>Retrieving Files</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>
                  // Get a public URL for a file<br/>
                  const getImageUrl = (path) => {<br/>
                  &nbsp;&nbsp;const { data } = supabase.storage.from('images').getPublicUrl(path);<br/>
                  &nbsp;&nbsp;return data.publicUrl;<br/>
                  };<br/>
                </code>
              </pre>

              <h4>Deleting Files</h4>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                <code>
                  // Delete a file<br/>
                  const deleteImage = async (path) => {<br/>
                  &nbsp;&nbsp;const { error } = await supabase.storage<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;.from('images')<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;.remove([path]);<br/>
                  <br/>
                  &nbsp;&nbsp;if (error) {<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;throw error;<br/>
                  &nbsp;&nbsp;}<br/>
                  <br/>
                  &nbsp;&nbsp;return true;<br/>
                  };<br/>
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div 
          className="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('deployment')}
        >
          <h2 className="text-lg font-medium text-gray-900">5. Deployment</h2>
          {openSections['deployment'] ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
        
        {openSections['deployment'] && (
          <div className="p-6">
            <div className="prose max-w-none">
              <h3>Deploying to Vercel</h3>
              <ol>
                <li>Push your code to a GitHub repository.</li>
                <li>Go to <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Vercel.com</a> and sign up or log in.</li>
                <li>Click "Add New" and select "Project".</li>
                <li>Import your GitHub repository.</li>
                <li>Configure your project:
                  <ul>
                    <li>Framework Preset: Next.js</li>
                    <li>Root Directory: ./</li>
                    <li>Build Command: next build</li>
                    <li>Output Directory: .next</li>
                  </ul>
                </li>
                <li>Add your environment variables:
                  <ul>
                    <li>NEXT_PUBLIC_SUPABASE_URL</li>
                    <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                    <li>SUPABASE_SERVICE_ROLE_KEY</li>
                  </ul>
                </li>
                <li>Click "Deploy".</li>
              </ol>

              <h3>Using the Vercel-Supabase Integration</h3>
              <p>For an even easier setup, you can use the Vercel-Supabase integration:</p>
              <ol>
                <li>In your Vercel dashboard, go to your project.</li>
                <li>Click on "Integrations" in the top navigation.</li>
                <li>Search for "Supabase" and click on it.</li>
                <li>Click "Add Integration".</li>
                <li>Select your Supabase project and Vercel project.</li>
                <li>Click "Add Integration".</li>
              </ol>
              <p>This will automatically set up all the required environment variables for you.</p>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4">
                <div className="flex">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
                  <div>
                    <p className="text-sm text-green-700">
                      <strong>Congratulations!</strong> You've successfully set up Supabase with your ArtVista gallery website. You now have authentication, database, and storage capabilities to build a full-featured art gallery platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Link 
          href="/admin" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

