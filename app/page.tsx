"use client";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers, setUser } from "@/store/users/users.slice";
import Button from "@/components/common/button";
import { useGetPostsQuery } from "@/store/posts/posts.api";
import ConnectionStatus from "@/components/common/connectionStatus";

export default function Home() {
  const dispatch = useDispatch();

  const users: any = useSelector(selectUsers);
  const { data } = useGetPostsQuery({});

  const handleButtonClick = () => {
    dispatch(setUser([...users, { name: "Roshan Poudel" }]));
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <ConnectionStatus />
      <div className=" h-[80vh] overflow-auto text-indigo-500">
        {data &&
          data.map((post: any, i: number) => (
            <div key={i}>
              {i + 1}. {post.title}
            </div>
          ))}
      </div>
      <Button
        onClick={() => {
          handleButtonClick();
        }}
        variant="danger"
        size="large"
        className="mx-10"
      >
        Click me
      </Button>

      <div className="h-[80vh] overflow-auto text-indigo-500">
        {users?.map((user: any, i: number) => (
          <div key={i}>{user.name + " - " + (i + 1)}</div>
        ))}
      </div>
    </div>
  );
}
