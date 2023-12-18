import styled from "styled-components";
import { useAuthStore, UserAuth } from "../index";

export default function Home() {

    const { signOut } = useAuthStore();
    const { user } = UserAuth();

    return (
        <Container>
            <h1>Bienvenido a Home { user.full_name } </h1>
            <img src={ user.picture } alt="" />
            <br />
            <button onClick={signOut}>Cerrar</button>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
`;