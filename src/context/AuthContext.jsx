import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, InsertarUsuarios } from '../index';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async ( event, session ) => {
                if (session === null) {
                    setUser(null);
                } else {
                    setUser(session?.user.user_metadata);
                    insertarUsuario(session?.user.user_metadata, session?.user.id);
                    console.log("Event: ", event);
                    console.log("Sesion: ", session?.user.user_metadata);
                }
            }
        );
        return () => {
            authListener.subscription;
        };
    }, []);

    const insertarUsuario = async ( dataProvider, idAuthSupabase ) => {
        const p = {
            nombres: dataProvider.name,
            foto: dataProvider.picture,
            idauth_supabase: idAuthSupabase
        };
        console.log();("p: ", p);
        await InsertarUsuarios(p);
    };

    return (
        <AuthContext.Provider value = {{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
}