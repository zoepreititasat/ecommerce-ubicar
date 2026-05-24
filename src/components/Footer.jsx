import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-8 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">UbiCar</h2>
          <p className="text-sm text-gray-500 mt-2">
            © 2026 UbiCar Technologies Inc.
          </p>
        </div>

        <nav className="flex items-center gap-5 text-sm text-gray-600">
          <Link to="/privacidad">Privacy</Link>
          <Link to="/terminos">Terms</Link>
          <Link to="/empresa">Company Details</Link>
        </nav>
      </div>
    </footer>
  )}