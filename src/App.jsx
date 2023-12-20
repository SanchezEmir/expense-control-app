import { MyRoutes, Sidebar, Device, Light, Dark, AuthContextProvider, MenuBurger, useUsuariosStore } from "./index";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";

export const ThemeContext = createContext(null);

function App() {

  const { mostrarUsuarios, datausuarios } = useUsuariosStore();

  const { pathname } = useLocation();

  // const [theme, setTheme] = useState("dark");
  const theme = datausuarios?.tema === "0" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;

  const [ sidebarOpen, setSidebarOpen ] = useState(false);

  const { isLoading, error } = useQuery({ queryKey: ["mostrar usuarios"], queryFn: () => mostrarUsuarios()} );

  if (isLoading){
    return (
      <div>
        cargando...
      </div>
    )
  }
  if (error) {
    return (
      <div>
        error...
      </div>
    )
  }

  return (
    <>
      <ThemeContext.Provider value={{theme}}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            {
              pathname != "/login" ? (
                <Container className={ sidebarOpen?"active":"" }>
                <div className="contentSidebar">
                <Sidebar state={ sidebarOpen } setState={ setSidebarOpen }/>
                </div>
                <div className="contentMenuBurger">
                  <MenuBurger/>
                </div>
                <ContainerBody>
                  <MyRoutes />
                </ContainerBody>
              </Container>
              ) : (
                <MyRoutes />
              )
            }
            
            <ReactQueryDevtools initialIsOpen={true} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${(props) => props.theme.bgtotal};
  transition: 0.3s ease-in-out;
  
  .contentSidebar{
    display: none;
  }

  .contentMenuBurger{
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active{
      grid-template-columns: 220px 1fr;
    }
    .contentSidebar{
      display: initial;
    }
    .contentMenuBurger{
      display: none;
    }
  }
`;

const ContainerBody = styled.div`
  grid-column: 1;
  width: 100%;
  @media ${Device.tablet} {
    grid-column: 2;
  }
`;

export default App;
