import React from 'react'
import { Link } from 'react-router-dom'
const Main = () => (
  <main className="container mt-5">
    <h1>Fast Company</h1>
    <p>Находите интересных людей, знакомьтесь и оставляйте комментарии.</p>
    <Link className="btn btn-primary" to="/users">
      Посмотреть пользователей
    </Link>
  </main>
)
export default Main
