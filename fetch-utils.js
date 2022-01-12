const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwODU3MCwiZXhwIjoxOTU1MDg0NTcwfQ.b9_dCGIQkWfhzS3QZihLzQkD3n-sAt3L9swaEU7JzqI';
const SUPABASE_URL = 'https://rfwnchvtfqbachqhdfbi.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createCity() {
    const response = await client
        .from('cities')
        .insert([
            {
                name: 'Boring',
                waterfront: 1,
                skyline: 1,
                castle: 1,
                slogans: []
            }
        ])
        //.match({ user_id: city.user_id })
        
        .single();
    return checkError(response);
}
console.log(createCity);
export async function updateWaterfront(value) {
    //const currentUserID = client.auth.user().id;

    const response = await client 
        .from('cities')
        .update({ waterfront: value })
        //.match({ user_id: currentUserID })
        .single();
    return checkError(response);
}

export async function updateSkyline(value) {
    //const currentUserID = client.auth.user().id;

    const response = await client 
        .from('cities')
        .update({ skyline: value })
        //.match({ user_id: currentUserID })
        .single();
    return checkError(response);
}

export async function updateCastle(value) {
    //const currentUserID = client.auth.user().id;

    const response = await client 
        .from('cities')
        .update({ castle: value })
        //.match({ user_id: currentUserID })
        .single();
    return checkError(response);
}

export async function updateSlogans(value) {
    //const currentUserID = client.auth.user().id;

    const response = await client 
        .from('cities')
        .update({ slogans: value })
        //.match({ user_id: currentUserID })
        .single();
    return checkError(response);
}

export async function getCity() {
    const response = await client
        .from('cities')
        .select()
        //.match({ user_id: client.auth.user().id })
        .single();

    return checkError(response);
}

export async function updateName(id) {
    const response = await client   
        .from('cities')
        .update({ name: id })
        .single();
    return checkError(response);
}



export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
