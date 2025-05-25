import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components/";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  const heroes = getHeroesByName(query);

  const { searchText, onInputChange } = useForm({ searchText: query });

  const onSearchSubmit = (event) => {
    event.preventDefault();

    navigate(`?q=${searchText.toLowerCase().trim()}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-2">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {query === "" ? (
            <div className="alert alert-primary animate__animated animate__fadeIn">
              Search a hero
            </div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger animate__animated animate__fadeIn">
                No hero with <b>{query}</b>
              </div>
            )
          )}

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
