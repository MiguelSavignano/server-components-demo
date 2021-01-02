function Content2() {
  const [location, setLocation] = useState({
    selectedId: null,
    isEditing: false,
    searchText: '',
  });

  const cache = unstable_getCacheForType(() => new Map());
  const key = JSON.stringify(location);
  const [response, setResponse] = useState(cache.get(key));

  useEffect(() => {
    const response = createFromFetch(fetch('/react?location=' + encodeURIComponent(key)).then((r) =>
      r.text()
    ))
    console.log({ response });
    cache.set(key, response);
      setResponse(response);
  }, []);

  return (
      response ? response.readRoot() : null
  );
}
