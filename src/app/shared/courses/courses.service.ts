import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courses = [
    {
      url: '../../../assets/imges/feelings.png',
      title: 'Mental health training',
      description:
        'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. ',
    },
    {
      url: '../../../assets/imges/feelings.png',
      title: 'Mental health training',
      description:
        'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. ',
    },
    {
      url: '../../../assets/imges/feelings.png',
      title: 'Mental health training',
      description:
        'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. ',
    },
  ];
}
