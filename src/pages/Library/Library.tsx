import { AppstoreFilled } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CustomBtn from "../../components/CustomBtn/CustomBtn";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import { useAppSelector } from "../../hooks/redux";
import { useAuth } from "../../hooks/useAuth";
import { removeGame } from "../../redux/slices/localStorageSlice";
import { IGames } from "../../types/IGames";
import style from "./Library.module.scss";

const Library: FC = () => {
  window.scrollTo(0, 0);

  const { email } = useAuth();
  const { users } = useAppSelector((state) => state.local);
  const dispatch = useDispatch();

  const handleClickRemove = (e: React.MouseEvent, game: IGames) => {
    e.preventDefault();
    email && dispatch(removeGame({ email, game }));
  };

  return (
    <div className="container">
      <Typography.Title level={2}>
        <AppstoreFilled /> My Library
      </Typography.Title>

      <Divider />

      {email && users[email]?.length > 0 ? (
        <>
          {users[email].map((game) => (
            <HorizontalCard
              game={game}
              key={game.id}
              type={"library"}
              removeGame={(e) => handleClickRemove(e, game)}
            />
          ))}
          <Typography.Text className={style.dark}>
            Add more games to your library!
          </Typography.Text>
        </>
      ) : (
        <div className={style.empty}>
          <img
            src="https://www.freetogame.com/assets/images/props/bag.png"
            alt="bag"
            width={290}
            height={310}
          />
          <Typography.Title level={3}>
            Add games to your library!
          </Typography.Title>
          <Typography.Paragraph>
            Save games you want to play and Keep track of the games you own!
          </Typography.Paragraph>
          <Link to="/games/all" className={style.btn}>
            <CustomBtn type={"link"}>Browse Games</CustomBtn>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Library;
