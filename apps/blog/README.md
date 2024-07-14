## 기술 스택

<table>
  <th>구분</th>
  <th>기술 스택</th>
  <tr>
    <td align="center"><b>common</b></td>
    <td>
      <img src="https://img.shields.io/badge/pnpm-FFCB00.svg?style=flat&logo=pnpm&logoColor=white" />
      <img src="https://img.shields.io/badge/Turborepo-EF4444.svg?style=flat&logo=turborepo&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>frontend</b></td>
    <td>
      <img src="https://img.shields.io/badge/Next.js-000000.svg?style=flat&logo=next.js&logoColor=white" />
      <img src="https://img.shields.io/badge/Server%20Component-000000.svg?style=flat&logo=next.js&logoColor=white" />
      <img src="https://img.shields.io/badge/Zustand-000000?style=flat&logo=zustand&logoColor=white" />
      <img src="https://img.shields.io/badge/TailwindCss-06B6D4.svg?style=flat&logo=tailwindcss&logoColor=white" />
      <img src="https://img.shields.io/badge/Framer%20Motion-0055FF.svg?style=flat&logo=framer&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>backend</b></td>
    <td>
      <img src="https://img.shields.io/badge/Sanity-ef3f2f.svg?style=flat&logo=sanity&logoColor=white" />
    </td>
  </tr>
  
  <tr>
    <td align="center"><b>CI/CD</b></td>
    <td>
      <img src="https://img.shields.io/badge/GitHub%20Actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white" />
    </td>
  </tr>
  <tr>
    <td align="center"><b>deployment</b></td>
    <td>
      <img src="https://img.shields.io/badge/docker-1D63ED.svg?style=flat&logo=docker&logoColor=white" />
      <img src="https://img.shields.io/badge/NGINX-%23009639.svg?style=flat&logo=nginx&logoColor=white" />
      <img src="https://img.shields.io/badge/aws-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white" />
    </td>
  </tr>
 
</table>

## 웹 접근성 체크리스트

 <table>
    <thead>
      <tr>
        <th scope="col" id="1"> 원칙 </th>
        <th scope="col" id="2"> 지침 </th>
        <th scope="col" id="3"> 검사항목 </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="13">인식의 용이성</td>
        <td rowspan="5">대체텍스트</td>
        <td>이미지에 대체텍스트가 제공되었는가</td>
      </tr>
      <tr>
        <td>차트에 테이블 마크업으로 대체 텍스트가 제공되었는가</td>
      </tr>
      <tr>
        <td>대체텍스트가 이미지를 상세하게 설명하고 있는가</td>
      </tr>
      <tr>
        <td>캡챠 이미지의 alt에 보안문자가 제공되지 않았는가</td>
      </tr>
      <tr>
        <td>사용자가 이미지를 업로드하는 경우 대체텍스트를 제공하는 입력이 제공되었는가</td>
      </tr>
      <tr>
        <td rowspan="3">멀티미디어 대체수단</td>
        <td>동영상에 자막이 제공되었는가</td>
      </tr>
      <tr>
        <td>동영상에 텍스트만 나오는 경우 스크립트가 제공되었는가</td>
      </tr>
      <tr>
        <td>사용자가 동영상을 업로드하는 경우 스크립트 혹은 자막을 제공하는 입력이 제공되었는가</td>
      </tr>
      <tr>
        <td rowspan="5">명료성</td>
        <td>Pagiation, Carousel, 탭, 차트가 콘텐츠가 색에 무관하게 인식될 수 있는가 ex) 패턴, 굵기</td>
      </tr>
      <tr>
        <td>지시사항이 모양, 크기, 위치, 방향, 색, 소리 등에 관계없이 인식될 수 있는가</td>
      </tr>
      <tr>
        <td>아이콘/기호를 이용하여 지시사항을 전달할 경우 아이콘/기호에 대체텍스트 혹은 부가적인 설명이 제공되는가</td>
      </tr>
      <tr>
        <td>색을 이용한 설명이 제공되지 않았는가</td>
      </tr>
      <tr>
        <td>텍스트와 배경간의 명도대비가 3대1 이상인가</td>
      </tr>
      <tr>
        <td rowspan="15">운용의 용이성</td>
        <td rowspan="9">입력장치 접근성</td>
        <td>페이지 진입/ 마우스 호버 시 자동으로 동영상/소리가 재생되지 않는가</td>
      </tr>
      <tr>
        <td>모든 기능을 키보드로 사용이 가능한가</td>
      </tr>
      <tr>
        <td>이웃한 컨텐츠를 border(혹은 채도대비 혹은 패턴 혹은 줄/글자 간격 혹은 기타 방법)으로 구분할 수 있는가  </td>
      </tr>
      <tr>
        <td>Focus의 위치를 시각적으로 알 수 있는가</td>
      </tr>
      <tr>
        <td>1이상의 tabindex가 강제로 지정되지 않았는가</td>
      </tr>
      <tr>
        <td>Form 내에서 submit에 Focus 순서가 가장 뒤늦게 배치되었는가 </td>
      </tr>
      <tr>
        <td>팝업이 열리는 경우 열렸을때 초점이 팝업 내부로 이동하고 닫혔을때 팝업을 열었던 컨트롤로 Focus가 이동하는가</td>
      </tr>
      <tr>
        <td>버튼의 크기가 대각선으로 6mm이상인가</td>
      </tr>
      <tr>
        <td>컨트롤이 연달아 있는 경우 1px이상의 gap이 제공되었는가</td>
      </tr>
      <tr>
        <td rowspan="3">충분한 시간제공</td>
        <td>시간제한이 있는 콘텐츠를 가급적으로 넣지 않았는가</td>
      </tr>
      <tr>
        <td>시간제한이 있는 콘텐츠의 응답시간을 조절할 수 있는가</td>
      </tr>
      <tr>
        <td>자동으로 변경되는 컨텐츠의 움직임을 제어할 수 있는가 ex) Carousel, 실시간 급상승</td>
      </tr>
      <tr>
        <td >광과민성 발작예방</td>
        <td>초당 3~50회 주기로 깜빡이는 컨텐츠를 제공하지 않았는가</td>
      </tr>
      <tr>
        <td rowspan="2">쉬운 네비게이션</td>
        <td>모든 페이지에 공통적으로 들어있는 부분을 건너뛸 수 있는 버튼이 페이지 가장 앞에 제공 되었는가 ex) 본문으로 이동하기, 주메뉴로 이동하기</td>
      </tr>
      <tr>
        <td>모든 페이지에 공통적으로 들어있는 부분이 키보드 접근시 화면에 노출되는가</td>
      </tr>
      <tr>
        <td rowspan="8">이해의 용이성</td>
        <td rowspan="5">가독성</td>
        <td>웹페이지 제목이 유일한가</td>
      </tr>
      <tr>
        <td>웹페이지 제목에 특수기호가 2개이상 제공되지 않았는가</td>
      </tr>
      <tr>
        <td>iframe에도 title이 지정되었는가 ex)&lt;iframe title=&quot;광고&quot; /&gt;</td>
      </tr>
      <tr>
        <td>섬네일과 텍스트를 클릭했을때 동일한 링크로 이동할때 이 둘을 하나로 묶어서 링크가 제공되었는가</td>
      </tr>
      <tr>
        <td>html 태그에 lang으로 주로 사용하는 언어가 지정되었는가</td>
      </tr>
      <tr>
        <td rowspan="2">예측가능성</td>
        <td>페이지 진입 시 새창이 뜨는 경우가 없는가</td>
      </tr>
      <tr>
        <td>컨트롤을 클릭했을 때 새창이 뜬다는 것을 미리 알려주는가</td>
      </tr>
      <tr>
        <td>컨텐츠의 논리성</td>
        <td>컨텐츠가 논리적인 순서로 제공되었는가 ex) 탭 1제목 &gt; &quot;탭 1내용 &gt; 탭2제목 &gt; 탭2 내용&quot; 혹은 &quot;내용 상단에 invisible 제목 제공&quot;</td>
      </tr>
      <tr>
        <td rowspan="8">견고성</td>
        <td rowspan="6">문법준수</td>
        <td>테이블 th에 scope가 설정되었는가</td>
      </tr>
      <tr>
        <td>테이블 제목/요약(caption)이 제공되었는가</td>
      </tr>
      <tr>
        <td>복잡한 테이블의 경우 th의 id와 td의 headers가 연결되었는가</td>
      </tr>
      <tr>
        <td>input에 대응하는 label이 제공되었는가</td>
      </tr>
      <tr>
        <td>한개의 label이 여러개의 input과 매칭되어야하는 경우 input 마다 title혹은 arial-label이 제공되었는가ex) &quot;생년월일 중 년 4자리 입력&quot;, &quot;생년월일 중 월 입력&quot;</td>
      </tr>
      <tr>
        <td>label이 없어야하는 경우 input에 title혹은 aria-label이 제공되었는가</td>
      </tr>
      <tr>
        <td rowspan="2">웹어플리케이션 접근성</td>
        <td>입력서식에 오류가 있는경우 오류가 발생한 입력 서식으로 Focus가 이동되는가</td>
      </tr>
      <tr>
        <td>입력서식에 오류가 있는경우 원인 혹은 해결방법을 알려주었는가</td>
      </tr>
    </tbody>
  </table>
