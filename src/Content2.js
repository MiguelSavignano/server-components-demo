function Content2() {
  const [location, setLocation] = useState({
    selectedId: null,
    isEditing: false,
    searchText: '',
  });
  const cache = unstable_getCacheForType(() => new Map());
  const key = JSON.stringify(location);
  const [response, setResponse] = useState(cache.get(key));

  useEffect(async () => {
    const reactTree = await createFromFetch(fetch('/react?location=' + encodeURIComponent(key)));
    console.log(reactTree)
    console.log(typeof reactTree)
    console.log(response.readRoot())
  }, []);

  // return response.readRoot();
  return null;
}
