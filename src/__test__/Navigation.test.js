import React from "react";
import Navigation from "../Navigation.js";
import {fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

const mockUseNavigate =  jest.fn();

jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>mockUseNavigate
}))

test('document item should render',()=>{
    render(
        <MemoryRouter>
            <Navigation/>
        </MemoryRouter>
    )
    const documentLink = screen.getByTestId('documents');
    expect(documentLink).toBeInTheDocument();
})
test('video item should render',()=>{
    render(
        <MemoryRouter>
            <Navigation/>
        </MemoryRouter>
    )
    const videoLink = screen.getByTestId('video');
    expect(videoLink).toBeInTheDocument();
})

test('should redirect to document when clicking document link',()=>{
    render(
        <MemoryRouter>
            <Navigation/>
        </MemoryRouter>
    )
    const documentLink = screen.getByTestId('documents');
    fireEvent.click(documentLink);
    expect(mockUseNavigate).toHaveBeenCalledWith('/documents')
})

test('should redirect to video when clicking video link',()=>{
    render(
        <MemoryRouter>
            <Navigation/>
        </MemoryRouter>
    )
    const documentLink = screen.getByTestId('video');
    fireEvent.click(documentLink);
    expect(mockUseNavigate).toHaveBeenCalledWith('/video')
})