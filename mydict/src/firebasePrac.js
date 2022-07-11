//데이터 불러오기와 추가하기는 상위 폴더인 컬렉션 정보가 필요

//컬렉션 정보
collection(db, "mpm_words"); //db에 있는 mpm_words 컬렉션의 컬렉션 정보

//데이터 불러오기 getDocs
React.useEffect(async () => {
  const query = await getDocs(collection(db, "mpm_words")); //db에 있는 mpm_words 컬렉션에서 가져온다.
  console.log(query);
  query.forEach((doc) => {
    //문서 갯수만큼 반복
    console.log(doc.id, doc.data()); //문서 id와 문서 데이터
  });
}, []);

//데이터 추가하기 addDocs
React.useEffect(async () => {
  const docRef = await addDoc(collection(db, "mpm_words"), {
    ////db에 있는 mpm_words 컬렉션에 , 이후의 내용을 추가한다.
    word: "ABORT",
    def: "Directive call to cease action, attack, event, or mission.",
    ex: "ACACIA, COCA 1. ABORT.",
    num: 0,
  });
}, []);

//===================================================================================================//
//데이터 수정하기와 삭제하기는 대상 문서 정보가 필요

//문서 정보 doc
doc(db, "mpm_words", "word1"); //db에 있는 mpm_words 컬렉션의 word1 문서

//데이터 수정하기 updateDoc
React.useEffect(async () => {
  const docRef = doc(db, "mpm_words", "word1");
  await updateDoc(docRef, {
    word: "BINGO",
    def: "Out of Fuel",
    ex: "ACACIA, COCA 1. BINGO.",
    num: 0,
  });
}, []);

//데이터 삭제하기 addDocs
React.useEffect(async () => {
  const docRef = doc(db, "bucket", "word1");
  await deleteDoc(docRef);
}, []);
