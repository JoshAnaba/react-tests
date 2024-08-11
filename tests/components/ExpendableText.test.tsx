import { render, screen} from '@testing-library/react'
import ExpandableText from '../../src/components/ExpandableText'
import userEvent from '@testing-library/user-event'

describe('ExpandableText', () => {
  const renderComponent = (text: string) => {
    render(<ExpandableText text={text} />)
  }
  const limit = 255
  const longText = 'a'.repeat(limit+1)
  const truncatedText = longText.substring(0, limit) + '...'
  const text = 'Short Text'
  it("should render correct text if less than 255 characters", () => {
    render(<ExpandableText text={text} />)
    expect(screen.getByText(text)).toBeInTheDocument()
  })
  it("should truncate text if it is longer than 255 characters", () => {
    
   renderComponent(longText)
    expect(screen.getByText(truncatedText)).toBeInTheDocument()
    const showMoreBtn = screen.getByRole('button')
    expect(showMoreBtn).toHaveTextContent(/more/i)
  })
  
  it('should expand text when show more button is clicked', async () => {
   renderComponent(longText)
    const showMoreBtn = screen.getByRole('button', {name: /more/i})
    const user = userEvent.setup()
    await user.click(showMoreBtn)
    expect(screen.getByText(longText)).toBeInTheDocument()
    expect(showMoreBtn).toHaveTextContent(/less/i)
  })

  it('should contract text when show less button is clicked', async () => {
   renderComponent(longText)
    const showMoreBtn = screen.getByRole('button', {name: /more/i})
    const user = userEvent.setup()
    await user.click(showMoreBtn)
    const showLessBtn = screen.getByRole('button', {name: /less/i})
    await user.click(showLessBtn)
    expect(screen.getByText(truncatedText)).toBeInTheDocument()
    expect(showMoreBtn).toHaveTextContent(/more/i)
  })
})