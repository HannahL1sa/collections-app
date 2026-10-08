import { Link } from "react-router-dom";
import { ChatBubbleLeftRightIcon, HomeIcon, UserGroupIcon, DocumentCurrencyDollarIcon } from '@heroicons/react/24/solid'

function Sidebar() {
  return (
    <aside
    id="default-sidebar"
    className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
    >
    <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200">
        <ul className="space-y-2 font-medium">
          {/* Dashboard */}
          <li>
              <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2.5 text-gray-900 rounded-lg bg-gray-100 group"
              >
                  <HomeIcon className="size-6 text-blue-500" />
                  <p className="flex-1 ms-3 whitespace-nowrap"> Dashboard </p>
              </Link>
          </li>
          {/* Clients */}
          <li>
            <Link
                to="/clients"
                className="flex items-center px-3 py-2.5 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
            >
                <UserGroupIcon className="size-6 text-blue-500" />
                <p className="flex-1 ms-3 whitespace-nowrap"> Clients </p>
            </Link>
          </li>

          {/* Invoices */}
          <li>
              <Link
                  to="/invoices"
                  className="flex items-center px-3 py-2.5 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
              >
                <DocumentCurrencyDollarIcon className="size-6 text-blue-500" />
                <p className="flex-1 ms-3 whitespace-nowrap"> Invoices </p>
              </Link>
          </li>

          {/* Follow-Ups */}
          <li>
              <Link
                  to="/follow-ups"
                  className="flex items-center px-3 py-2.5 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
              >
                <ChatBubbleLeftRightIcon className="size-6 text-blue-500" />
                <p className="flex-1 ms-3 whitespace-nowrap"> Follow-Ups </p>
              </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;