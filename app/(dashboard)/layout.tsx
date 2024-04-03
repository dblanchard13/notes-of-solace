import NoteList from '@/components/NoteList'
import SearchBar from '@/components/SearchBar'
import { PropsWithChildren } from 'react'

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="w-full h-full">
        <header className="h-[60px] border-b border-white/10">
          <SearchBar />
          <div className="px-4 h-full text-3xl leading-[30px] text-center absolute left-1/2 top-[15px] w-1/3 transform -translate-x-1/2">
            Notes of Solace
          </div>
        </header>

        <main className="h-[calc(100vh-60px)]">
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <NoteList />
            </div>
            <div className="col-span-3">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
