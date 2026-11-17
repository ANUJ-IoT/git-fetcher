import { useState } from "react";
import BackImage from "../src/assets/BackImage.png";
import GitLogo from "../src/assets/GitLogo.png";

export default function Home() {
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await (
      await fetch(`https://api.github.com/search/users?q=${name}`)
    ).json();
    setUser(data.items);
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${BackImage})` }}
        className="w-full min-h-screen text-white font-mono bg-no-repeat bg-center bg-cover bg-fixed"
      >
        {/* This is the header section */}
        <div>
          <header className="p-10  ml-10 ">
            <div className="flex gap-4">
              <img
                src={GitLogo}
                alt="Git Logo"
                height={75}
                width={75}
                className="rounded-2xl"
              />
              <p className="text-5xl font-bold pt-4">Git Fetcher</p>
            </div>
            <p>Search any Github user instantly</p>
          </header>
        </div>

        {/* This is the search box and button */}

        <div>
          <form onSubmit={handleSubmit} className="flex gap-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-60 p-2 rounded-md ml-20 outline-none"
              placeholder="Enter Name..."
              required
            />
            <button
              type="submit"
              className="cursor-pointer bg-green-500 h-10 rounded-sm w-25 outline-none text-gray-50"
            >
              Search
            </button>
          </form>
        </div>

        {/* This is User data section */}
        <div>
          <div className="flex flex-wrap items-center justify-center mt-20 gap-10">
            {user.map((user) => (
              <div
                className=" bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl cursor-pointe p-5 h-auto w-130 rounded-2xl"
                key={user.id}
              >
                <div className="flex items-center gap-5 flex-wrap ">
                  <img
                    src={user.avatar_url}
                    alt="nothing just simple image"
                    width={200}
                    height={300}
                    className="rounded-2xl m-2 object-fit:cover"
                  />
                  <p className="text-2xl font-bold ">{user.login}</p>{" "}
                </div>

                <a
                  href={`https://www.github.com/${user.login}`}
                  target="_blank"
                >
                  <button className="m-3 p-4 w-fit bg-emerald-300 rounded-2xl cursor-pointer">
                    View Profile
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
