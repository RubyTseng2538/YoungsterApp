import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Footer from "../Footer.js";
import {MemoryRouter} from "react-router-dom";
// import { createMemoryHistory } from 'history';

// const history = createMemoryHistory();
const direct = jest.fn();

const mockUseNavigate =  jest.fn();

jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>mockUseNavigate
}))

test("footer back button should render", ()=>{
    render(
        <MemoryRouter>
            <Footer/>
        </MemoryRouter>  
    )
    const backLink = screen.getByTestId('back');
    expect(backLink).toBeInTheDocument();
})

test("footer home button should render", ()=>{
    render(
        <MemoryRouter>
            <Footer/>
        </MemoryRouter>  
    )
    const homeLink = screen.getByTestId('home');
    expect(homeLink).toBeInTheDocument();
})

test("footer signIn button should render", ()=>{
    render(
        <MemoryRouter>
            <Footer/>
        </MemoryRouter>  
    )
    const signLink = screen.getByTestId('signIn');
    expect(signLink).toBeInTheDocument();
})

test("test if back return back click", ()=>{
    render(
        <MemoryRouter>
            <Footer/>
        </MemoryRouter>
    )
    const backLink = screen.getByTestId('back');
    fireEvent.click(backLink);
    expect(mockUseNavigate).toHaveBeenCalledWith('/', { replace: true });

})

test("test if admin return direct", ()=>{
    render(
        <MemoryRouter>
            <Footer/>
        </MemoryRouter>
    )
    const signLink = screen.getByTestId('signIn');
    fireEvent.click(signLink)
    expect(direct).toHaveBeenCalled;
})

test('should redirect to home when clicking home link',()=>{
    render(
        <MemoryRouter>
            <Footer/>
        </MemoryRouter>
    )
    const homeLink = screen.getByTestId('home');
    fireEvent.click(homeLink);
    expect(history.push).toHaveBeenCalled;
})
