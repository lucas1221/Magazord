// sample_item.dart
class SampleItem {
  final int id;
  final String title;
  final String description;
  bool completed;

  SampleItem({
    required this.id,
    required this.title,
    required this.description,
    this.completed = false,
  });
}

