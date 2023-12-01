import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../test/test-utils'
import DateFilter from '.'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers().setSystemTime(new Date('2023-12-05'))

describe('<DateFilter />', () => {
  const mockOnFilter = jest.fn()

  it('renders the DateFilter component', () => {
    renderWithProviders(<DateFilter onFilter={mockOnFilter} />)

    expect(screen.getByTestId('date-filter-range')).toBeInTheDocument()
  })

  it('calls onFilter with the selected date range', async () => {
    renderWithProviders(<DateFilter onFilter={mockOnFilter} />)

    act(() => {
      userEvent.click(screen.getByTestId('date-filter-range').querySelectorAll('input')[0])
    })

    await waitFor(() => {
      expect(screen.getByText('Dec')).toBeInTheDocument()
    })

    userEvent.click(screen.getAllByText('13')[0])
    userEvent.click(screen.getAllByText('15')[0])

    await waitFor(() => {
      expect(mockOnFilter).toHaveBeenCalledWith('12/13/2023', '12/15/2023')
    })
  })
})
