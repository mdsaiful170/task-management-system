import  { useEffect, useState } from 'react';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import { FilePenLine, Save, Search, Trash2 } from 'lucide-react';
import { CardSpotlight } from '../ui/Card-spotlight';

interface TaskBox {
  id: number;
  title: string;
  text: string;
  isCompleted: boolean;
  createDate: string;
}
const Taskmanagement = () => {
  const [tasks, settasks] = useState<TaskBox[]>(() => {
    const taskSaved = localStorage.getItem('taskSaved');
    return taskSaved ? JSON.parse(taskSaved) : [];
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<TaskBox[]>(tasks);
  const [edittaskId, setEdittaskId] = useState<number | null>(null);
  const [newtitleText, setnewtitileText] = useState<string>('');
  const [newText, setnewText] = useState<string>('');
  const [edittitle, setEdittitle] = useState<string>('');
  const [edittext, setEdittext] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('taskSaved', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTasks(tasks);
      setShowSuggestions(false); // Hide suggestions when search is empty
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
      setShowSuggestions(true); // Show suggestions when there's a search query
    }
  }, [searchQuery, tasks]);

  const AddTask = () => {
    if (newtitleText.trim() === '' || newText.trim() === '') {
      alert('Please fill both fields');
      return;
    }
    const Newtask: TaskBox = {
      id: Date.now(),
      title: newtitleText,
      text: newText,
      isCompleted: false,
      createDate: new Date().toLocaleString(),
    };

    settasks([...tasks, Newtask]);
    setnewtitileText('');
    setnewText('');
  };

  const editTask = (id: number) => {
    const updateTask = tasks.map((task) => {
      return task.id === id
        ? { ...task, title: edittitle, text: edittext }
        : task;
    });

    settasks(updateTask);
    setEdittaskId(null);
    setEdittitle('');
    setEdittext('');
  };

  const deleteTask = (id: number) => {
    const deleteTask = tasks.filter((task) => task.id !== id);
    settasks(deleteTask);
  };

  const complateTaskToggleer = (id: number) => {
    const complageTask = tasks.map((task) => {
      return task.id === id
        ? { ...task, isCompleted: !task.isCompleted }
        : task;
    });
    settasks(complageTask);
  };

  const handleSuggestionClick = (taskTitle: string) => {
    setSearchQuery(taskTitle); // Set search query to the clicked suggestion
    setShowSuggestions(false); // Hide suggestions after selection
  };

  return (
    <>
      <section className="py-8">
        <div className="flex items-center flex-col justify-center  ">
          <h1 className="text-3xl font-bold capitalize py-5 text-transparent bg-clip-text bg-gradient-to-r from-stone-700 via-slate-400 to-gray-700 !animate-colorshift">
            Task ManageMent System
          </h1>
          <form action="" className="max-w-xl w-full max-auto">
            <input
              type="text"
              placeholder="Task Name"
              max={30}
              maxLength={30}
              required
              value={newtitleText}
              onChange={(e) => setnewtitileText(e.target.value)}
              className="w-full mb-4 capitalize focus:outline-none focus:border-slate-800 border border-neutral-900 outline-none placeholder:text-gray-400 bg-transparent backdrop-blur-md rounded-md text-base text-neutral-400 font-semibold py-3 px-2"
            />

            <textarea
              rows={3}
              placeholder="Task Descripttions"
              required
              value={newText}
              onChange={(e) => setnewText(e.target.value)}
              className="w-full capitalize focus:outline-none focus:border-slate-800 border border-neutral-900 outline-none resize-none overflow-y-auto backdrop-blur-md placeholder:text-gray-400 bg-transparent rounded-md text-base text-neutral-400 font-semibold py-3 px-2"
            ></textarea>

            <HoverBorderGradient
              containerClassName="rounded-md w-full"
              as="button"
              onClick={AddTask}
              className="bg-black border-0 text-white w-full "
            >
              <span>Add Task</span>
            </HoverBorderGradient>
          </form>

          <div className=" relative flex-col gap-4 mt-8 md:flex-row flex items-center  w-full max-w-full  justify-between">
            <div className="w-full border border-neutral-700  rounded max-w-full md:max-w-md h-12 flex items-center ">
              <input
                type="search"
                placeholder="search Your task"
                className=" border-e border-e-neutral-700 backdrop-blur-md outline-none  text-base font-medium capitalize text-stone-300 px-3 bg-transparent w-full h-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="px-2 duration-150  hover:bg-gray-200 hover:text-slate-800 h-full "
                onClick={() => setShowSuggestions(false)} // Hide suggestions on button click
              >
                <Search size={24} strokeWidth={3} />
              </button>

              {/* Search suggestion box */}
              {showSuggestions && searchQuery && (
                <div className="absolute top-12 z-10 bg-black border max-w-full w-full md:max-w-xs border-neutral-800  ">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="px-4 py-2 hover:bg-neutral-800 tracking-wider cursor-pointer "
                      onClick={() => handleSuggestionClick(task.title)} // Hide suggestions on selection
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-lg border border-neutral-800 shadow-sm px-5 rounded  py-2 font-medium text-center mt-2 sm:mt-0 backdrop-blur-md bg-white/5 text-gray-300">
                Total Task :{' '}
                <span className="text-stone-300">{tasks.length}</span>
              </h1>
            </div>
          </div>

          <div className="pt-6 w-full">
            <div className="items-start place-items-center  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-full ">
              {filteredTasks.map((task) => (
                <CardSpotlight key={task.id} className='p-2 border cursor-pointer  border-stone-800 bg-black  shadow-sm  rounded backdrop-blur-sm flex flex-col justify-between relative max-h-[20rem] overflow-hidden  w-full h-auto'>
                  <div className="z-20 ">
                    {edittaskId === task.id ? (
                      <>
                        <input
                          type="text"
                          placeholder="Edit Task Name"
                          max={30}
                          maxLength={30}
                          required
                          value={edittitle}
                          onChange={(e) => setEdittitle(e.target.value)}
                          className="w-full mb-4 capitalize focus:outline-none focus:border-slate-800 border border-neutral-900 outline-none placeholder:text-gray-400 bg-transparent rounded-md text-base text-neutral-400 font-semibold py-3 px-2"
                        />
                        <textarea
                          rows={3}
                          placeholder="Task Descripttions"
                          required
                          value={edittext}
                          onChange={(e) => setEdittext(e.target.value)}
                          className="w-full capitalize mb-3 focus:outline-none focus:border-slate-800 border border-neutral-900 outline-none resize-none overflow-y-auto placeholder:text-gray-400 bg-transparent rounded-md text-base text-neutral-400 font-semibold py-3 px-2"
                        ></textarea>
                        <HoverBorderGradient
                          containerClassName="rounded-md w-full py-0"
                          as="button"
                          onClick={() => editTask(task.id)}
                          className="bg-black text-white w-full hover:text-green-400 duration-150 transition-all  inline-flex items-center justify-center gap-x-1 "
                        >
                          <Save size={18} className="inline-block " />{' '}
                          <span className="mt-[.5px]">Save</span>
                        </HoverBorderGradient>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl capitalize text-center border-b border-neutral-700 font-bold text-stone-300">
                          {task.title}
                        </h3>
                        <div className="relative ">
                          <div>
                            <div className="flex items-center gap-x-[.5px] py-2">
                              <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => complateTaskToggleer(task.id)}
                                className="size-4  mx-1  text-green-600 bg-green-400 border-gray-300 rounded focus:ring-green-500 "
                              />
                              <span
                                className={` text-sm  font-semibold  ${
                                  task.isCompleted
                                    ? 'text-green-400'
                                    : 'text-slate-400'
                                }`}
                              >
                                {task.isCompleted ? 'Completed' : 'Inprogress'}
                              </span>
                            </div>
                          </div>

                          <span
                            className={`block pb-2 text-sm overflow-y-auto max-h-[8rem] break-words whitespace-pre-wrap text-white/80 ${
                              task.isCompleted ? 'line-through' : ''
                            }`}
                          >
                            {task.text}
                          </span>

                          <div className="border-t border-t-neutral-700">
                            <span className="text-[12px] text-slate-500 pt-1 ">
                              Created: {task.createDate}
                            </span>
                            <div className="flex items-center justify-between pt-1">
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="text-xs border-b border-b-black hover:border-b duration-200 hover:border-b-red-500  transition-all ease-linear hover:text-red-500 font-normal flex items-center gap-x-1 "
                              >
                                <Trash2 size={16} className="inline-block" />
                                <span className="mt-1 text-slate-500">
                                  Delete
                                </span>
                              </button>

                              <button
                                onClick={() => {
                                  setEdittaskId(task.id);
                                  setEdittitle(task.title);
                                  setEdittext(task.text);
                                }}
                                className="text-xs hover:border-b border-b-black duration-200 hover:border-b-sky-500 transition-all ease-linear hover:text-sky-500 font-normal flex items-center gap-x-1"
                              >
                                <FilePenLine
                                  size={16}
                                  className="inline-block"
                                />
                                <span className="mt-1 text-slate-500">
                                  Edit
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Taskmanagement;
