import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gtrtlycmuysjbybugwou.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0cnRseWNtdXlzamJ5YnVnd291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2NDM2MzYsImV4cCI6MTk5NTIxOTYzNn0.3jw4N9pzKoXW7gcmM5DEFAKzl64Uc7RuGUCOrcoeWIA"
);
