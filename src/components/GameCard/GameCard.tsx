import React, { FC, useState, useEffect } from "react";
import style from "./GameCard.module.scss";
import cn from "classnames";
import { Card, Space } from "antd";
import { IGames } from "../../types/IGames";
import {
  AppstoreAddOutlined,
  AppstoreFilled,
  ChromeFilled,
  MinusSquareFilled,
  WindowsFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useAuth } from "../../hooks/useAuth";
import { addGame, removeGame } from "../../redux/slices/localStorageSlice";

interface GameCardProps {
  game: IGames;
  meta?: "title" | "full";
  small?: boolean;
}

const GameCard: FC<GameCardProps> = ({ game, meta, small }) => {
  const { isAuth, email } = useAuth();
  const { users } = useAppSelector((state) => state.local);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    email && setIsSelected(users[email]?.some((lgame) => lgame.id === game.id));
  }, [email]);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    isAuth ? dispatch(addGame({ email, game })) : navigate("/login");
    setIsSelected((game) => !game);
  };

  const handleClickRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(removeGame({ email, game }));
    setIsSelected((game) => !game);
  };

  if (!game) return null;
  if (meta) {
    return (
      <Link
        to={`/game/${game.id}`}
        className={cn(style.cardLink, {
          [style.small]: small,
        })}
      >
        {isSelected && (
          <div className={style.inLib}>
            <AppstoreFilled /> In Library
          </div>
        )}
        <div className={cn({ [style.selected]: isSelected })}>
          <Card
            className={style.card}
            bodyStyle={{ padding: "20px" }}
            hoverable
            cover={
              <div className={style.card__cover}>
                <img
                  src={game?.thumbnail}
                  alt={game?.title}
                  width={356}
                  className={cn({ [style.small]: small })}
                />
              </div>
            }
          >
            <div className={style.card__title}>
              <h3 className={style.card__title_heading}>{game?.title}</h3>
              <div
                className={cn(style.badge, {
                  [style.small_badge]: meta === "full",
                })}
              >
                FREE
              </div>
            </div>
            {meta === "full" && (
              <div className={style.card__descr}>
                <div className={style.card__descr_text}>
                  {game.short_description}
                </div>
                <div className={style.card__descr_else}>
                  {isSelected ? (
                    <div
                      className={style.addBtn}
                      onClick={(e) => handleClickRemove(e)}
                    >
                      <MinusSquareFilled />
                    </div>
                  ) : (
                    <div
                      className={style.addBtn}
                      onClick={(e) => handleClickAdd(e)}
                    >
                      <AppstoreAddOutlined />
                    </div>
                  )}
                  <Space>
                    <div className={cn(style.badge, style.dark)}>
                      {game?.genre}
                    </div>
                    <div>
                      {game?.platform === "Web Browser" ? (
                        <ChromeFilled />
                      ) : (
                        <WindowsFilled />
                      )}
                    </div>
                  </Space>
                </div>
              </div>
            )}
          </Card>
        </div>
      </Link>
    );
  } else {
    return (
      <Link to={`/game/${game.id}`} className={style.cardLink}>
        <Card
          className={style.card}
          bodyStyle={{ display: "none" }}
          hoverable
          cover={
            <div className={style.card__cover}>
              <img src={game?.thumbnail} alt={game?.title} width={356} />
              <div className={cn(style.badge, style.bottom_right)}>FREE</div>
            </div>
          }
        />
      </Link>
    );
  }
};

export { GameCard };
