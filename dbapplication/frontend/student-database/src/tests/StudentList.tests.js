import { render, screen } from '@testing-library/react';
import StudentList from '../components/StudentList'; 

test('renders student list with names', () => {
  const students = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
  
  render(<StudentList students={students} />);
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Doe')).toBeInTheDocument();
});
