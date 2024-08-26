import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import "./style.scss";

// Defines the type of options
interface IState {
  id: number;
  title: string;
  icon: string;
}

function App() {
  const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [activeOptionId, setActiveOptionId] = useState<number>();
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<IState[]>([
    {
      id: 1,
      title: "Education",
      icon: "https://img.icons8.com/deco-color/48/graduation-cap.png",
    },
    {
      id: 2,
      title: "Yeeeah, science!",
      icon: "https://img.icons8.com/cotton/64/brain-3.png",
    },
    {
      id: 3,
      title: "Art",
      icon: "https://img.icons8.com/officel/50/theatre-mask.png",
    },
    {
      id: 4,
      title: "Sport",
      icon: "https://img.icons8.com/emoji/48/soccer-ball-emoji.png",
    },
    {
      id: 5,
      title: "Games",
      icon: "https://img.icons8.com/emoji/48/video-game-emoji.png",
    },
    {
      id: 6,
      title: "Health",
      icon: "https://img.icons8.com/emoji/48/hospital-emoji.png",
    },
    {
      id: 7,
      title: "Programming",
      icon: "https://img.icons8.com/scribby/50/source-code.png",
    },
    {
      id: 8,
      title: "Music",
      icon: "https://img.icons8.com/color/48/musical-notes.png",
    },
    {
      id: 9,
      title: "Business",
      icon: "https://img.icons8.com/color/48/bonds.png",
    },
    {
      id: 10,
      title: "Cars",
      icon: "https://img.icons8.com/color/48/sedan.png",
    },
    {
      id: 11,
      title: "Computer",
      icon: "https://img.icons8.com/color/48/imac.png",
    },
  ]);

  useEffect(() => {
    // Clear the error when box opens
    if (isBoxOpen) {
      setError("");
    }
  }, [isBoxOpen]);

  const handleSelect = (item: IState) => {
    // Update selected item
    setValue(item?.title);
    setActiveOptionId(item?.id);
  };

  const handleAddOption = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e?.stopPropagation();

    // Pass only if the key pressed was Enter
    if (e?.key !== "Enter") return;

    setError("");

    // return if value was empty
    if (value === "") {
      setIsBoxOpen(false);
      return setError("Please write something!");
    }

    // return if value already exists
    const isDuplicated = options?.some(
      (item) => item?.title?.toLocaleLowerCase() === value?.toLocaleLowerCase()
    );
    if (isDuplicated) {
      setIsBoxOpen(false);
      return setError(`Option (${value}) already exists in the list!`);
    }

    const newValue = {
      id: options?.length + 1,
      title: value,
      icon: "",
    };

    setOptions([...options, newValue]);
    setValue("");
  };

  return (
    <main className="container">
      {/* Select box */}
      <section className="select_container roboto-regular">
        <input
          value={value}
          type="text"
          className="select_input"
          onClick={() => setIsBoxOpen((prev) => !prev)}
          placeholder="Type in and press Enter!"
          onChange={(e) => {
            try {
              setValue(e?.target?.value);
            } catch (error) {
              setValue("");
            }
          }}
          onKeyDown={(e) => handleAddOption(e)}
        />

        {/* arrow up/down */}
        <span
          className="input_arrow"
          onClick={() => setIsBoxOpen((prev) => !prev)}
        >
          {isBoxOpen ? (
            <IoIosArrowUp className="option_icon icon_arrow" />
          ) : (
            <IoIosArrowDown className="option_icon icon_arrow" />
          )}
        </span>

        {/* Error message */}
        {error && <p className="error_text roboto-bold">{error}</p>}

        {/* Options Box */}
        {isBoxOpen && options?.length > 0 && (
          <div className="box_container">
            {options?.map((item, i) => (
              <div
                key={i}
                className={`select_option_item ${
                  activeOptionId === item?.id && "select_option_item_active"
                }`}
                onClick={() => handleSelect(item)}
              >
                <div className="option_text_icon">
                  <p>{item?.title}</p>
                  {item?.icon && (
                    <img
                      src={item?.icon}
                      alt={item?.title}
                      loading="lazy"
                      className="option_icon_img"
                      width={"25px"}
                      height={"25px"}
                    />
                  )}
                </div>

                {/* Checkmark - Display if selected */}
                {activeOptionId === item?.id && (
                  <IoCheckmark className="option_icon" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Description box */}
        <div className="desc_box">
          <h1>Meraj's assignment</h1>
          <h2>Technologies used:</h2>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>SCSS</li>
          </ul>

          <h2>Features:</h2>
          <ul>
            <li>Custom select box</li>
            <li>Ability to add items</li>
            <li>Icons in select options</li>
            <li>Adds new item by pressing Enter</li>
            <li>Duplicate options filter</li>
            <li>Responsive</li>
          </ul>

          <div className="desc_author">
            <h2>Author:</h2>
            <a href="https://meraj.vercel.app/" target="_blank">
              Meraj Mazidi
            </a>
          </div>
        </div>
      </section>

      {/* Hidden close box event trigger */}
      <span className="close_box_prompt" onClick={() => setIsBoxOpen(false)} />
    </main>
  );
}

export default App;
