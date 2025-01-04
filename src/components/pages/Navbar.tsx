import { Github, Slack } from 'lucide-react';
import  { useEffect, useState } from 'react';
import { HoverBorderGradient } from '../ui/hover-border-gradient';


const Navbar = () => {
  const[todaydateandtiem, setdateandtiem] = useState<string>('')
  useEffect(()=>{
    const interval = setInterval(() => {
      const currentDate = new Date();
   
      setdateandtiem(currentDate.toLocaleString('en-US'));
    }, 1000);
    return () => clearInterval(interval);
  })

  return (
    <>
      <header className="fixed border-b border-neutral-900 z-50 left-0 right-0 top-0 bg-black">
        <div className=" py-5 px-3 lg:px-5 flex items-center justify-between ">
          <a href="#" className="flex relative" title="Task ManageMent System">
            <Slack className='text-sky-500  absolute -top-2 left-9' />
            <h1 className="text-3xl  font-bold first-letter:text-cyan-300 first-letter:text-5xl first-letter:font-semibold text-yellow-50">
              TMS
            </h1>
          </a>
          <div>
            <h1 className='text-xl font-bold capitalize py-5 text-transparent bg-clip-text bg-gradient-to-r from-stone-400 via-slate-400 to-gray-700 !animate-colorshift'>
              {todaydateandtiem}
            </h1>
          </div>
          <nav>
            <a href="https://github.com/mdsaiful170" title='mdsaiful170 github link'>
              <HoverBorderGradient
                containerClassName="rounded-md px-3"
                as="button"
                className="bg-black text-gray-500 flex   items-center border-none gap-x-3"
              >
                <Github className="text-gray-400" /> GitHub
              </HoverBorderGradient>
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
