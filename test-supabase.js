require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
    const { data, error } = await supabase
        .from('consultations')
        .insert([{ patient_name: 'test', phone: '010-0000-0000', memo: 'test memo' }]);

    if (error) {
        console.error('Error inserting:', error);
    } else {
        console.log('Insert successful:', data);
    }
}

testInsert();
