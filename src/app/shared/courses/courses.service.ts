import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courses = [
    {
      id: 1,
      url: '../../../assets/imges/feelings.png',
      title: 'Mental health training',
      description:
        'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. ',
    },
    {
      id: 2,
      url: '../../../assets/imges/feelings.png',
      title: 'Mental health training',
      description:
        'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. ',
    },
    {
      id: 3,
      url: '../../../assets/imges/feelings.png',
      title: 'Mental health training',
      description:
        'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. ',
    },
  ];
  delete(id: any){
    this.courses = this.courses.filter(item => item.id !== id)
  }
  addCourse(courses: any){
    this.courses.push(courses)
  }
}
