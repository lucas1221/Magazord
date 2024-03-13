import 'dart:convert';
import 'package:http/http.dart' as http;

const CHAVE_API = 'f7437dcf0e3734abd1c1621aff1cddd7';

Future<Map<String, dynamic>> obterClimaPorCoordenadas(double lat, double lon) async {
  final url = Uri.parse('https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&appid=$CHAVE_API&units=metric&lang=pt_br');
  final resposta = await http.get(url);

  if (resposta.statusCode == 200) {
    return jsonDecode(resposta.body);
  } else {
    throw Exception('Falha ao obter dados de clima.');
  }
}


