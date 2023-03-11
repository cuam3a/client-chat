import { useAppSelector } from '../store/hooks'

const getDate = () => {
  var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	return current_date+" "+current_time;
}

const ChatPanel = () => {
  const chat = useAppSelector(state => state.chat)
  const auth = useAppSelector(state => state.auth)

  return (
    <div className='w-full h-3/4 md:h-full'>
      <div className='h-full border border-gray-700'>
        <div className="flex text-xs scroll-smooth md:scroll-auto overflow-auto flex-col-reverse h-full pb-10">
          {
            chat.messages?.map((data, index) => {
              return (
                <div key={index} className={"flex px-3 mb-4 " + (data.nickname == auth.nickname ? "justify-end" : "justify-start")}>
                  {
                    data.type === "message"
                      ?
                      <div
                        style={{ fontSize: '15px' }}
                        className={"mr-2 py-2 px-4  rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white " + (data.nickname == auth.nickname ? "bg-blue-700" : "bg-gray-700")}
                      >
                        {data.message} <br /><span className='flex justify-end' style={{ fontSize: 7 }}>{data.nickname}</span>
                      </div>
                      :
                      <div
                        style={{ fontSize: '10px' }}
                        className="text-slate-500 text-sm flex justify-center items-start w-full"
                      >
                        {`Usuario: ${data.nickname} Conectado, ${getDate()}`}
                      </div>
                  }

                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default ChatPanel