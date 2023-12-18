import { MyRoutes, Sidebar, Device, Light, Dark, AuthContextProvider, MenuBurger } from "./index";
import { createContext, useState } from "react";
import { styled, ThemeProvider } from "styled-components";
// import { ReactQueryDevtools } from "react-query/devtools";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;
  const [ sidebarOpen, setSidebarOpen ] = useState(false);

  return (
    <>
      <ThemeContext.Provider value={{setTheme, theme}}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
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
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
