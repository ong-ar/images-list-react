import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { actionCreators as dogsActions } from '../../redux/modules/dogs';
import './index.scss';

class List extends PureComponent {
  // ref
  list = null;

  // onload 시 모두 실행되지 않도록 debounce 적용
  handleOnLoad = _.debounce(() => {
    // console.log('call handleOnLoad');
    this.masonry();
  }, 100);

  // window resize 될 경우 768 이상에서만 재정렬
  handleOnResize = _.throttle(() => {
    // console.log('call handleOnResize');
    const { dogs } = this.props;

    // image 갯수가 0개가 아니고 화면 width 가 768 보다 클 떄 masonry 정렬 호출
    if (dogs.images.length > 0 && window.innerWidth > 768) {
      this.masonry();
    }
  }, 500);

  // handle scroll
  // scroll event 호출이 제어 throttle 적용
  handleOnScroll = _.throttle(() => {
    // console.log('call handleOnScroll');
    const { dogs, getDogs } = this.props;

    // 스크롤 위치 + 내부 화면 크기 >= list height + top 위치 - 100 경우
    if (dogs.images.length > 0 && window.scrollY + window.innerHeight
      >= this.list.scrollHeight + this.list.offsetTop - 100
    ) { getDogs(); }
  }, 500);

  // 마운트
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
    window.addEventListener('resize', this.handleOnResize);
  }

  // 언마운트
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
    window.removeEventListener('resize', this.handleOnResize);
  }

  // masonry 정렬 함수
  masonry() {
    const parentElement = this.list;
    const parentOffsetWidth = parentElement.offsetWidth;
    const childrenElements = parentElement.children;
    let firstNewlineIndex = -1; // 한 줄에 몇개의 컬럼이 있는지 담는 변수
    let columnsInfo = []; // masonry 정렬을 위해 필요한 변수
    let parentHeight = 0; // 부모 height 담고 있을 변수

    // children 엘리먼트 전부 한번씩 접근
    for (let i = 0; i < childrenElements.length; i += 1) {
      const element = childrenElements[i];

      const css = element.style;

      // 이미지 모두 포지션을 absolute
      css.position = 'absolute';

      // top, left 변수 선언
      let top = 0;
      let left = 0;

      // top, left 계산
      // 가장 첫번째 이미지인 경우 위치를 top, left : 0
      if (i === 0) {
        top = 0;
        left = 0;
      } else {
        // 부모 엘리먼트 width 를 넘어가는 순간 column 갯수 저장
        if (parentOffsetWidth < childrenElements[i - 1].offsetLeft
          + childrenElements[i - 1].offsetWidth
          + element.offsetWidth && firstNewlineIndex === -1) {
          firstNewlineIndex = i;
        }

        // column 갯수가 아직 저장되지 않는 경우 top: 0 고정, left 는 바로 왼쪽 element width 값을 받아 left
        if (firstNewlineIndex === -1) {
          top = 0;
          left = childrenElements[i - 1].offsetLeft + childrenElements[i - 1].offsetWidth;
        } else {
          // element 가 개행 후 첫번째 일 때 그 행에 있는 column 들의 top, left 계산
          if (i % firstNewlineIndex === 0) {
            const columns = firstNewlineIndex;
            // 이전 행의 index 를 array value 로 만듬
            columnsInfo = Array.from({ length: columns }, (__, k) => k + i - columns)
              .map(index => ({
                top: childrenElements[index].offsetTop
                 + childrenElements[index].offsetHeight,
                left: childrenElements[index].offsetLeft,
              }))
              .sort((a, b) => {
                // https://eslint.org/docs/rules/no-nested-ternary
                // 중첩 삼항연산 불가능 (lint)
                if (a.top < b.top) {
                  return -1;
                }
                if (a.top > b.top) {
                  return 1;
                }
                return 0;
              });
          }

          const applyingIndex = i % firstNewlineIndex;
          const { top: applyingTop, left: applyingLeft } = columnsInfo[applyingIndex];

          top = applyingTop;
          left = applyingLeft;
        }
      }

      // top, left 적용
      css.top = `${top}px`;
      css.left = `${left}px`;

      // 부모 엘리먼트 height 계산
      parentHeight = top + element.offsetHeight > parentHeight
        ? top + element.offsetHeight : parentHeight;
    }

    // 부모 엘리먼트 height 적용 (bottom 이벤트)
    parentElement.style.height = `${parentHeight}px`;
  }

  render() {
    const { dogs } = this.props;
    return (
      <div
        className="List"
        ref={(ref) => { this.list = ref; }}
      >
        {dogs.images.map((image, index) => {
          // key 로 index 값을 사용하지 못하여 임시로 재정의하여 사용
          // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
          const key = `${index}`;

          return (
            <div key={key}>
              <img src={image} alt={index} onLoad={this.handleOnLoad} />
            </div>
          );
        })}
      </div>
    );
  }
}


// props type
List.propTypes = {
  dogs: propTypes.shape({ images: propTypes.array.isRequired }).isRequired,
  getDogs: propTypes.func.isRequired,
};

const mapActionToProps = dispatch => ({
  getDogs: () => dispatch(dogsActions.getDogs()),
});


const mapStateToProps = (state) => {
  const { dogs } = state;
  return { dogs };
};

export default connect(
  mapStateToProps,
  mapActionToProps,
)(List);
