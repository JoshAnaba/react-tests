import { render, screen} from '@testing-library/react'
import TermsAndConditions from '../../src/components/TermsAndConditions'
import userEvent from '@testing-library/user-event'

describe('TermsAndConditions', () => {
  const renderComponent = () => { 
    render(<TermsAndConditions />) 
    return {
      heading: screen.getByRole('heading'),
      checkbox: screen.getByRole('checkbox'),
      button: screen.getByRole('button')
  }}
  it("should render correct text with initial state", () => {
    const { heading, button, checkbox } = renderComponent()
    expect(heading).toHaveTextContent('Terms & Conditions')
    expect(button).toBeDisabled()
    expect(checkbox).not.toBeChecked()
  })
  it("should render an enabled button if checked", async() => {
    const { checkbox, button } = renderComponent()
    const user = userEvent.setup()
    await user.click(checkbox)

    expect(button).toBeEnabled()
  })
})