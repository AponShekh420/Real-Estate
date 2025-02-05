import { getTotalCount } from "@/utilis/getTotalCount";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";

const ListItem = ({
  parent,
  subElement,
  parentPathNumber,
  childrenPathNumber,
}) => {
  const { state, area, city } = useSelector((state) => state.communityFilter);
  const path = usePathname();

  return (
    <li
      className={`${
        path.split("/")[parentPathNumber] === parent?.slug ? "text-danger" : ""
      }`}
    >
      <Link
        href={
          area
            ? `/summary/${state?.slug}/${parent?.slug}`
            : `/summary/${parent?.slug}`
        }
      >
        <div className="d-flex justify-content-between align-items-center">
          <p
            className={`text-capitalize m-0 ${
              path.split("/")[parentPathNumber] === parent?.slug
                ? "text-danger"
                : ""
            }`}
          >
            <b>
              {parent?.name} ({getTotalCount(parent?.community)})
            </b>
          </p>
          {path.split("/")[parentPathNumber] !== parent?.slug ? (
            <IoIosArrowDown className="p-0" />
          ) : (
            <IoIosArrowUp className="p-0 text-danger" />
          )}
        </div>
      </Link>
      {/* fist chiled */}
      <ul
        className="w-90 list-unstyled ml10"
        style={{
          marginTop: "2px",
          height:
            path.split("/")[parentPathNumber] === parent?.slug ? "100%" : "0",
          overflow:
            path.split("/")[childrenPathNumber] === parent?.slug
              ? "visible"
              : "hidden",
        }}
      >
        {" "}
        {/**height: 0, overflow: "hidden" */}
        {subElement?.map((eachElement, eachElementIndex) => {
          if (eachElement?.active) {
            return (
              <li
                className={`${
                  path.split("/")[childrenPathNumber] === eachElement?.slug
                    ? "text-danger"
                    : ""
                }`}
                key={eachElementIndex}
              >
                <Link
                  href={
                    area
                      ? `/summary/${state?.slug}/${area?.slug}/${eachElement?.slug}`
                      : state
                      ? `/summary/${state?.slug}/${eachElement?.slug}`
                      : `/summary/${state?.slug}/`
                  }
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <p
                      className={`text-capitalize m-0 ${
                        path.split("/")[childrenPathNumber] ===
                        eachElement?.slug
                          ? "text-danger"
                          : ""
                      }`}
                    >
                      {eachElement?.name} (
                      {getTotalCount(eachElement?.community)})
                    </p>
                    {path.split("/")[childrenPathNumber] !==
                    eachElement?.slug ? (
                      <IoIosArrowDown className="p-0" />
                    ) : (
                      <IoIosArrowUp className="p-0 text-danger" />
                    )}
                  </div>
                </Link>
                {/* second child */}
              </li>
            );
          }
        })}
      </ul>
    </li>
  );
};

export default ListItem;
