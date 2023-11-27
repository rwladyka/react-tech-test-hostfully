import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import App from "./App"

describe('initial test', () => {

    test('test 1', () => {
        expect(true).toBe(true)
    })

    test("Renders the main page", () => {
        render(<App />)
        expect(screen.getByText("Vite + React")).toBeInTheDocument()
    })
})