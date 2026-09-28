import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ItemsProvider } from './context/ItemsContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Report } from './pages/Report';
import { Search } from './pages/Search';
import { ItemDetails } from './pages/ItemDetails';
import { MyReports } from './pages/MyReports';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ItemsProvider>
          <div className="min-h-screen flex flex-col relative text-[#4A5B7A] selection:bg-[#5B7BFA] selection:text-white">
            {/* Background Decorative Ambient Blobs */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col pt-3 pb-8">
              <Header />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/item/:id" element={<ItemDetails />} />
                  <Route path="/my-reports" element={<MyReports />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </div>
        </ItemsProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
