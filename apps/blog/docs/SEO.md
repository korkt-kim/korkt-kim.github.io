# SEO

## 검색엔진 최적화를 하는 방법

1. meta 태그

- meta 태그는 검색 엔진에 검색을 했을 때 노출되는 웹페이지 컨텐츠이다.

  - title, description

2.  open graph

- 웹페이지 링크가 카카오톡이나 기타 SNS에 공유될 때 어떻게 노출될지 정의해주는 역할을 한다.
- 검색 상위 노출을 위한 품질 평가에 영향을 준다.
  - og:ttile
  - og:description
  - og:image

### NextJS

- nextJS에서는 meta태그와 open graph를 설정할 수 있는 Metadata api를 제공한다.([링크](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#default-fields))

  - MetaData는 경로에 따라 우선순위를 가진다.
    1. app/layout.tsx (Root Layout) <- lowest
    2. app/blog/layout.tsx (Nested Blog Layout)
    3. app/blog/[slug]/page.tsx (Blog Page) <- highest
    - 이 우선순위는 각각 shallow하게 merge 되므로 하나를 작성한다면 중복되더라도 풀로 작성해야한다.

- api 응답에따라 dynamic하게 metadata및 openGraph를 생성할 수 있다.
- 부모의 image를 끌고 올 수 있다.

## Sitemap

- Sitemap을 제출하면 일반적인 크롤링 과정에서 발견되지 않는 웹페이지도 문제없이 크롤링 될 수 있다.
  - `sitemap.xml`을 제출한다. `sitemap.xml`은 웹사이트 내 모든 페이지의 목록을 나열한 파일.

## robots.txt

- 검색엔진 로봇들의 접근을 조절해주고 제어해주는 역할을 한다.

```
//robots.txt

User-agent: *
Allow: /
```
