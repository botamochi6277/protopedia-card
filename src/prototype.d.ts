
type PrototypeRawData = {
  image1: string,
  image2: string,
  image3: string,
  image4: string,
  image5: string,
  prototypeNm: string,
  status: number,
  summary: string,
  userNm: string,
  teamNm: string,
  materialNm: string,
  tags: string,
  id: number,
  mainUrl: string,// main image filename
  createAt: string,
  releaseAt: string,
  updateAt: string,
  freeComment: string,
  systemDescription: string,
  systemImage: string, // image url
  goodCount: number,
  viewCount: number,
}

type PrototypeData = {
  name: string,
  summary: string,
  developing_status: number,
  images: string[],
  developer: string,
  team: string,
  tags: string[],
  materials: string[],
  prototype_id: number,
  main_img: string,
  create_at: string,
  release_at: string,
  update_at: string,
  free_comment: string, // markdown text
  system_description: string, // markdown text
  system_image: string,
  good_count: number,
  view_count: number,

}
