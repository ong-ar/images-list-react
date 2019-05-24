import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// import { actionCreators as dogsActions } from '../../redux/modules/dogs';
import './index.scss';


class List extends PureComponent {
  static sortImages() {
    const parentElement = document.querySelector('#Container');
    const parentOffsetWidth = parentElement.offsetWidth;
    const childrenElements = parentElement.children;
    let firstNewlineIndex = -1; // 한 줄에 몇개의 컬럼이 있는지 담는 변수
    let columnsInfo = []; // masonry 정렬을 위해 필요한 변수

    // children 엘리먼트 전부 한번씩 접근
    for (let i = 0; i < childrenElements.length; i += 1) {
      const element = childrenElements[i];

      const css = element.style;

      // 이미지 모두 포지션을 absolute
      css.position = 'absolute';

      // 가장 첫번째 이미지인 경우 위치를 top, left : 0
      if (i === 0) {
        css.top = '0px';
        css.left = '0px';
      } else {
        // 부모 엘리먼트 width 를 넘어가는 순간 column 갯수 저장
        if (parentOffsetWidth < childrenElements[i - 1].offsetLeft
          + childrenElements[i - 1].offsetWidth
          + childrenElements[i].offsetWidth && firstNewlineIndex === -1) {
          firstNewlineIndex = i;
        }

        // column 갯수가 아직 저장되지 않는 경우 top: 0 고정, left 는 바로 왼쪽 element width 값을 받아 left
        if (firstNewlineIndex === -1) {
          css.top = '0px';
          css.left = `${childrenElements[i - 1].offsetLeft + childrenElements[i - 1].offsetWidth}px`;
        } else {
          // element 가 개행 후 첫번째 일 때 그 행에 있는 column 들의 top, left 계산
          if (i % firstNewlineIndex === 0) {
            const columns = firstNewlineIndex;
            // 이전 행의 index 를 array value 로 만듬
            columnsInfo = Array.from({ length: columns }, (_, k) => k + i - columns)
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
          // 계산 된 top, left 적용
          css.top = `${columnsInfo[i % firstNewlineIndex].top}px`;

          css.left = `${columnsInfo[i % firstNewlineIndex].left}px`;
        }
      }
    }
    parentElement.style.height = `${parentElement.scrollHeight}px`;
  }

  render() {
    const { dogs } = this.props;
    return (
      <div
        className="Container"
        id="Container"
      >
        {dogs.images.map((image, index) => <div><img src={image} alt={index} key={index} onLoad={List.sortImages} /></div>)}
      </div>
    );
  }
}


// props type
List.propTypes = {
  dogs: propTypes.shape({ images: propTypes.array.isRequired }).isRequired,
};
/*
const mapActionToProps = dispatch => ({
  getDogs: () => dispatch(dogsActions.getDogs()),
});
*/

const mapStateToProps = (state) => {
  const { dogs } = state;
  return { dogs };
};

export default connect(
  mapStateToProps,
  null,
)(List);
